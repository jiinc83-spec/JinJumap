(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const slides = [
    {
      image: 'assets/hero-bicycle.png',
      label: '자전거와 숲길',
      title: '한 잔부터 한 걸음까지,<br><em>우리 동네 초록 생활.</em>',
      description: '텀블러 혜택 가게부터 업사이클링 판매처,<br>자전거와 분리수거 시설까지 아래로 둘러보세요.'
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
    dot.addEventListener('click', () => showSlide(index));
    dots.append(dot);
  });

  let current = 0;
  let activeImage = null;
  function showSlide(index) {
    const next = (index + slides.length) % slides.length;
    if (activeImage && next === current) return;
    current = next;
    const slide = slides[current];
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
    hero.dataset.slide = String(current + 1);
    heading.innerHTML = slide.title;
    description.innerHTML = slide.description;
    hero.querySelector('.hero-copy').classList.remove('hero-carousel-copy-enter');
    void hero.offsetWidth;
    hero.querySelector('.hero-copy').classList.add('hero-carousel-copy-enter');
    controls.querySelector('.hero-carousel-count').textContent = `${current + 1} / ${slides.length}`;
    [...dots.children].forEach((dot, dotIndex) => {
      if (dotIndex === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  controls.querySelectorAll('.hero-carousel-arrow')[0].addEventListener('click', () => showSlide(current - 1));
  controls.querySelectorAll('.hero-carousel-arrow')[1].addEventListener('click', () => showSlide(current + 1));
  hero.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showSlide(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showSlide(current + 1); }
  });

  let touchStart = null;
  hero.addEventListener('touchstart', event => {
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
  }, { passive: true });

  slides.slice(1).forEach(slide => { const image = new Image(); image.src = slide.image; });
  showSlide(0);
})();
