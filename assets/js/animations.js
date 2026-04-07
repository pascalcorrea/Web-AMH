(function() {
  // Respect reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.area-item').forEach(el => el.classList.add('area-in'));
    return;
  }

  // ===== SCROLL ANIMATIONS (genérico — excluye area-items) =====
  const areaItems = new Set(document.querySelectorAll('.area-item'));
  const animEls = [...document.querySelectorAll('.anim-fade-up')].filter(el => !areaItems.has(el));
  if (animEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    animEls.forEach(el => observer.observe(el));
  }

  // ===== ÁREAS — entrada escalonada =====
  const areasGrid = document.getElementById('areas-grid');
  if (areasGrid) {
    const areasObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Recoge solo los items visibles (desktop muestra cols separadas)
          const items = [...entry.target.querySelectorAll('.area-item')]
            .filter(el => el.offsetParent !== null); // excluye hidden
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add('area-in'), i * 55);
          });
          areasObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    areasObserver.observe(areasGrid);
  }

  // ===== HEADER HIDE/SHOW ON SCROLL =====
  const nav = document.querySelector('nav');
  let lastScrollY = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 100) {
          if (currentScrollY > lastScrollY) {
            nav.classList.add('header-hidden');
          } else {
            nav.classList.remove('header-hidden');
          }
        } else {
          nav.classList.remove('header-hidden');
        }
        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  });
})();
