(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMapPage = new URLSearchParams(location.search).get('view') === 'map';
  const swipeKey = 'namgang-home-map-swipe';

  if (isMapPage) {
    let enteredBySwipe = false;
    try {
      enteredBySwipe = sessionStorage.getItem(swipeKey) === '1';
      sessionStorage.removeItem(swipeKey);
    } catch {}
    if (enteredBySwipe && !reduceMotion) {
      const map = document.querySelector('#map');
      if (map) {
        map.classList.add('home-map-swipe-enter');
        map.addEventListener('animationend', () => map.classList.remove('home-map-swipe-enter'), { once: true });
      }
    }
    return;
  }

  const mapLink = document.querySelector('.mobile-map-entry');
  if (!mapLink) return;

  const preview = document.createElement('div');
  preview.className = 'home-map-swipe-preview';
  preview.setAttribute('aria-hidden', 'true');
  preview.innerHTML = '<div class="home-map-swipe-preview-label">남강 GREEN MAP <span>지도</span></div><svg viewBox="0 0 420 900" preserveAspectRatio="xMidYMid slice"><path class="swipe-map-river" d="M-30 520C60 470 85 575 160 530S260 420 340 470s95 120 150 80"/><path class="swipe-map-road" d="M-10 210 430 380M-20 365 430 205M35 900 190 0M255 900 140 0M0 720 420 570M-30 80 460 720M-20 610 430 840M350-20 220 920"/><path class="swipe-map-road thin" d="m18 0 88 900m250-900L278 900M0 300l420 35M0 470l420-100M0 795l420-140"/><circle cx="235" cy="415" r="9" class="swipe-map-pin"/><circle cx="272" cy="440" r="7" class="swipe-map-pin"/><circle cx="205" cy="455" r="7" class="swipe-map-pin"/></svg>';
  document.documentElement.append(preview);

  let startX = 0;
  let startY = 0;
  let lastX = 0;
  let lastTime = 0;
  let startTime = 0;
  let dragging = false;
  let gestureTarget = null;

  const reset = (animate = true) => {
    document.body.classList.remove('home-map-swipe-dragging');
    document.documentElement.classList.remove('home-map-swipe-active');
    document.body.style.transition = animate ? 'transform 340ms cubic-bezier(.22,.8,.25,1)' : 'none';
    preview.style.transition = animate ? 'transform 340ms cubic-bezier(.22,.8,.25,1)' : 'none';
    document.body.style.transform = 'translate3d(0,0,0)';
    preview.style.transform = 'translate3d(100vw,0,0)';
    window.setTimeout(() => {
      document.body.style.removeProperty('transition');
      document.body.style.removeProperty('transform');
      preview.style.removeProperty('transition');
      preview.style.removeProperty('transform');
    }, animate ? 360 : 0);
    dragging = false;
    gestureTarget = null;
  };

  const start = event => {
    if (event.touches.length !== 1) return;
    const target = event.target instanceof Element ? event.target : null;
    if (!target || target.closest('input,textarea,select,[contenteditable="true"],.mobile-search,.app-bottom-nav')) return;
    startX = lastX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    lastTime = performance.now();
    startTime = lastTime;
    gestureTarget = target;
  };

  const move = event => {
    if (!gestureTarget || event.touches.length !== 1) return;
    const touch = event.touches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    if (!dragging) {
      if (Math.abs(dx) < 12 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
      if (dx >= 0) { gestureTarget = null; return; }
      dragging = true;
      document.documentElement.classList.add('home-map-swipe-active');
      document.body.classList.add('home-map-swipe-dragging');
      document.body.style.transition = 'none';
      preview.style.transition = 'none';
    }
    event.preventDefault();
    const distance = Math.min(0, Math.max(-window.innerWidth, dx));
    document.body.style.transform = `translate3d(${distance}px,0,0)`;
    preview.style.transform = `translate3d(calc(100vw + ${distance}px),0,0)`;
    lastX = touch.clientX;
    lastTime = performance.now();
  };

  const finish = () => {
    if (!gestureTarget) return;
    if (!dragging) { gestureTarget = null; return; }
    const distance = startX - lastX;
    const elapsed = Math.max(1, performance.now() - startTime);
    const velocity = distance / elapsed;
    const commit = distance > Math.min(110, window.innerWidth * .24) || velocity > .55;
    gestureTarget = null;
    if (!commit) { reset(true); return; }
    if (reduceMotion) {
      location.href = mapLink.href;
      return;
    }
    try {
      sessionStorage.setItem(swipeKey, '1');
    } catch {}
    document.body.classList.add('home-map-swipe-leaving');
    document.body.style.transition = 'transform 360ms cubic-bezier(.22,.8,.25,1)';
    preview.style.transition = 'transform 360ms cubic-bezier(.22,.8,.25,1)';
    document.body.style.transform = 'translate3d(-100vw,0,0)';
    preview.style.transform = 'translate3d(0,0,0)';
    window.setTimeout(() => { location.href = mapLink.href; }, 365);
  };

  document.addEventListener('touchstart', start, { passive: true });
  document.addEventListener('touchmove', move, { passive: false });
  document.addEventListener('touchend', finish, { passive: true });
  document.addEventListener('touchcancel', () => { if (dragging) reset(true); else gestureTarget = null; }, { passive: true });
})();
