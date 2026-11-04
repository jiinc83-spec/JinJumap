(() => {
  const nav = document.querySelector('.app-bottom-nav');
  if (!nav) return;

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const storageKey = 'namgang-bottom-nav-direction';
  const body = document.body;
  const order = ['home', 'map', 'calendar', 'info'];
  const activeLink = nav.querySelector('[aria-current="page"]');
  const incoming = (() => {
    try {
      const value = sessionStorage.getItem(storageKey);
      sessionStorage.removeItem(storageKey);
      return value;
    } catch {
      return null;
    }
  })();

  if (incoming && !motionPreference.matches) {
    body.classList.add(incoming === 'left' ? 'nav-page-enter-from-right' : 'nav-page-enter-from-left');
    body.addEventListener('animationend', event => {
      if (event.target === body) body.classList.remove('nav-page-enter-from-right', 'nav-page-enter-from-left');
    }, { once: true });
  }

  const currentIndex = order.indexOf(activeLink?.dataset.bottomNav || 'home');
  nav.addEventListener('click', event => {
    const link = event.target instanceof Element ? event.target.closest('a[data-bottom-nav]') : null;
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || motionPreference.matches) return;
    const nextIndex = order.indexOf(link.dataset.bottomNav);
    if (nextIndex < 0 || nextIndex === currentIndex) return;

    const destination = new URL(link.href, location.href);
    if (destination.origin === location.origin && destination.pathname === location.pathname && destination.search === location.search) return;

    event.preventDefault();
    const direction = nextIndex > currentIndex ? 'left' : 'right';
    try { sessionStorage.setItem(storageKey, direction); } catch {}
    body.classList.add(direction === 'left' ? 'nav-page-leave-left' : 'nav-page-leave-right');
    window.setTimeout(() => { location.href = destination.href; }, 300);
  });
})();
