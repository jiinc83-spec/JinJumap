(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const slides = [
    {
      image: 'assets/hero-bicycle.png',
      label: '자전거와 숲길',
      title: '한 잔부터 한 걸음까지,<br><em>우리 동네 초록 생활.</em>',
      description: '텀블러 혜택 가게부터 재사용·자원순환 매장,<br>자전거와 분리수거 시설까지 아래로 둘러보세요.'
    },
    {
      image: 'assets/hero-coast.png',
      label: '푸른 숲길',
      title: '가까운 길에서,<br><em>초록을 발견해요.</em>',
      description: '걷고, 자전거를 타고, 자연을 아끼는<br>작은 선택을 이어가 보세요.'
    },
    {
      image: 'assets/hero-tumbler.png',
      label: '강변의 텀블러',
      title: '한 잔의 실천이,<br><em>동네의 변화를 만들어요.</em>',
      description: '개인컵 혜택을 확인하고<br>오늘의 초록 습관을 시작해 보세요.'
    }
  ];

  const heading = hero.querySelector('h1');
  const description = hero.querySelector('.hero-copy p:not(.eyebrow)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileTrack = document.body.classList.contains('mobile-layout') ? document.createElement('div') : null;
  if (mobileTrack) {
    mobileTrack.className = 'hero-carousel-track';
    mobileTrack.setAttribute('aria-hidden', 'true');
    slides.forEach(slide => {
      const panel = document.createElement('div');
      panel.className = 'hero-carousel-panel';
      panel.style.setProperty('--slide-image', `url("${slide.image}")`);
      mobileTrack.append(panel);
    });
    hero.prepend(mobileTrack);
  }
  const controls = document.createElement('div');
  controls.className = 'hero-carousel-controls';
  controls.setAttribute('aria-label', '첫 화면 사진 넘기기');
  controls.innerHTML = '<button class="hero-carousel-arrow" type="button" aria-label="이전 사진">‹</button><div class="hero-carousel-dots"></div><span class="hero-carousel-count" aria-live="polite"></span><button class="hero-carousel-arrow" type="button" aria-label="다음 사진">›</button>';
  hero.append(controls);

  const dots = controls.querySelector('.hero-carousel-dots');
  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `${index + 1}번 사진: ${slide.label}`);
    dot.addEventListener('click', () => { showSlide(index); restartAutoplay(); });
    dots.append(dot);
  });

  let current = 0;
  let activeImage = null;
  let settleTrack = null;
  let autoplayTimer = null;
  function stopAutoplay() {
    if (autoplayTimer !== null) window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
  function startAutoplay() {
    stopAutoplay();
    if (document.hidden || reducedMotion.matches) return;
    autoplayTimer = window.setInterval(() => showSlide(current + 1), 4000);
  }
  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }
  function updateSlide(index) {
    if (hero.dataset.slide === String(index + 1)) return;
    current = index;
    const slide = slides[index];
    hero.dataset.slide = String(index + 1);
    heading.innerHTML = slide.title;
    description.innerHTML = slide.description;
    const copy = hero.querySelector('.hero-copy');
    copy.classList.remove('hero-carousel-copy-enter');
    void hero.offsetWidth;
    copy.classList.add('hero-carousel-copy-enter');
    controls.querySelector('.hero-carousel-count').textContent = `${index + 1} / ${slides.length}`;
    [...dots.children].forEach((dot, dotIndex) => {
      if (dotIndex === index) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }
  function showSlide(index) {
    const next = (index + slides.length) % slides.length;
    if (mobileTrack) {
      settleTrack?.(next, 0, false);
      return;
    }
    if (activeImage && next === current) return;
    const slide = slides[next];
    const image = document.createElement('div');
    image.className = 'hero-carousel-image';
    image.style.setProperty('--slide-image', `url("${slide.image}")`);
    image.setAttribute('aria-hidden', 'true');
    hero.append(image);
    const previousImages = [...hero.querySelectorAll('.hero-carousel-image')].filter(layer => layer !== image);
    if (!activeImage || reducedMotion.matches) {
      image.classList.add('is-visible');
      previousImages.forEach(layer => layer.remove());
    } else {
      requestAnimationFrame(() => requestAnimationFrame(() => image.classList.add('is-visible')));
      window.setTimeout(() => previousImages.forEach(layer => layer.remove()), 750);
    }
    activeImage = image;
    hero.classList.add('hero-carousel-ready');
    updateSlide(next);
  }

  controls.querySelectorAll('.hero-carousel-arrow')[0].addEventListener('click', () => { showSlide(current - 1); restartAutoplay(); });
  controls.querySelectorAll('.hero-carousel-arrow')[1].addEventListener('click', () => { showSlide(current + 1); restartAutoplay(); });
  hero.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showSlide(current - 1); restartAutoplay(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showSlide(current + 1); restartAutoplay(); }
  });
  hero.addEventListener('pointerenter', stopAutoplay);
  hero.addEventListener('pointerleave', startAutoplay);
  hero.addEventListener('focusin', stopAutoplay);
  hero.addEventListener('focusout', () => { if (!hero.contains(document.activeElement)) startAutoplay(); });
  document.addEventListener('visibilitychange', () => document.hidden ? stopAutoplay() : startAutoplay());
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => entries[0].isIntersecting ? startAutoplay() : stopAutoplay(), { threshold: .25 }).observe(hero);
  }

  if (mobileTrack) {
    hero.classList.add('hero-carousel-ready');
    let scrollTimer;
    let touchStart = null;
    let dragging = false;
    let settling = false;
    let animationFrame = null;
    settleTrack = (index, velocity = 0, isGesture = true) => {
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      animationFrame = null;
      const target = index * mobileTrack.clientWidth;
      updateSlide(index);
      if (reducedMotion.matches) {
        mobileTrack.scrollLeft = target;
        mobileTrack.style.scrollSnapType = '';
        settling = false;
        return;
      }
      const start = mobileTrack.scrollLeft;
      const distance = target - start;
      if (Math.abs(distance) < 1) {
        mobileTrack.scrollLeft = target;
        mobileTrack.style.scrollSnapType = '';
        settling = false;
        return;
      }
      mobileTrack.style.scrollSnapType = 'none';
      settling = true;
      const duration = isGesture ? Math.max(340, Math.min(520, 470 - Math.abs(velocity) * 110)) : 720;
      const began = performance.now();
      const animate = now => {
        const progress = Math.min(1, (now - began) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        mobileTrack.scrollLeft = start + distance * eased;
        if (progress < 1) animationFrame = requestAnimationFrame(animate);
        else {
          mobileTrack.scrollLeft = target;
          mobileTrack.style.scrollSnapType = '';
          settling = false;
          animationFrame = null;
          updateSlide(index);
        }
      };
      animationFrame = requestAnimationFrame(animate);
    };
    mobileTrack.addEventListener('scroll', () => {
      if (dragging || settling) return;
      clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        updateSlide(Math.max(0, Math.min(slides.length - 1, Math.round(mobileTrack.scrollLeft / mobileTrack.clientWidth))));
      }, 120);
    }, { passive: true });
    mobileTrack.addEventListener('touchstart', event => {
      stopAutoplay();
      clearTimeout(scrollTimer);
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      animationFrame = null;
      settling = false;
      const touch = event.changedTouches[0];
      touchStart = { x: touch.clientX, y: touch.clientY, left: mobileTrack.scrollLeft, samples: [{ x: touch.clientX, time: performance.now() }] };
      dragging = false;
    }, { passive: true });
    mobileTrack.addEventListener('touchmove', event => {
      if (!touchStart) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - touchStart.x;
      const dy = touch.clientY - touchStart.y;
      if (!dragging && (Math.abs(dx) < 8 || Math.abs(dx) <= Math.abs(dy))) return;
      dragging = true;
      event.preventDefault();
      mobileTrack.style.scrollSnapType = 'none';
      mobileTrack.scrollLeft = Math.max(0, Math.min(mobileTrack.scrollWidth - mobileTrack.clientWidth, touchStart.left - dx));
      const now = performance.now();
      touchStart.samples.push({ x: touch.clientX, time: now });
      touchStart.samples = touchStart.samples.filter(sample => now - sample.time <= 110);
    }, { passive: false });
    function finishTouch(event) {
      if (!touchStart) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - touchStart.x;
      const startIndex = Math.round(touchStart.left / mobileTrack.clientWidth);
      if (dragging) {
        const samples = touchStart.samples;
        const first = samples[0];
        const last = samples[samples.length - 1];
        const velocity = first && last && last.time > first.time ? -(last.x - first.x) / (last.time - first.time) : 0;
        const threshold = Math.min(48, mobileTrack.clientWidth * .13);
        const shouldAdvance = Math.abs(dx) > threshold || Math.abs(velocity) > .38;
        const direction = dx === 0 ? Math.sign(velocity) : -Math.sign(dx);
        settleTrack(Math.max(0, Math.min(slides.length - 1, shouldAdvance ? startIndex + direction : startIndex)), velocity, true);
      } else {
        mobileTrack.style.scrollSnapType = '';
      }
      touchStart = null;
      dragging = false;
      restartAutoplay();
    }
    mobileTrack.addEventListener('touchend', finishTouch, { passive: true });
    mobileTrack.addEventListener('touchcancel', finishTouch, { passive: true });
    window.addEventListener('resize', () => {
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      animationFrame = null;
      settling = false;
      mobileTrack.style.scrollSnapType = 'none';
      mobileTrack.scrollLeft = current * mobileTrack.clientWidth;
      requestAnimationFrame(() => { mobileTrack.style.scrollSnapType = ''; });
    });
  } else {
    let touchStart = null;
    hero.addEventListener('touchstart', event => {
      stopAutoplay();
      const touch = event.changedTouches[0];
      touchStart = { x: touch.clientX, y: touch.clientY };
    }, { passive: true });
    hero.addEventListener('touchend', event => {
      if (!touchStart) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - touchStart.x;
      const dy = touch.clientY - touchStart.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) showSlide(current + (dx < 0 ? 1 : -1));
      touchStart = null;
      restartAutoplay();
    }, { passive: true });
  }

  slides.slice(1).forEach(slide => { const image = new Image(); image.src = slide.image; });
  showSlide(0);
  if (document.body.classList.contains('splash-active')) {
    const splashObserver = new MutationObserver(() => {
      if (!document.body.classList.contains('splash-active')) {
        splashObserver.disconnect();
        window.setTimeout(startAutoplay, 500);
      }
    });
    splashObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  } else startAutoplay();
})();
