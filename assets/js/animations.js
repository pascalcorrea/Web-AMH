(function() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.area-item').forEach(el => el.classList.add('area-in'));
    document.querySelectorAll('.anim-fade-up,.anim-fade-left,.anim-fade-right,.anim-scale-in,.anim-reveal,.anim-card')
      .forEach(el => el.classList.add('is-visible'));
    return;
  }

  // ===== GENERIC SCROLL OBSERVER =====
  const areaItems = new Set(document.querySelectorAll('.area-item'));
  const teamCards = new Set(document.querySelectorAll('.anim-card'));
  const genericEls = [
    ...document.querySelectorAll('.anim-fade-up,.anim-fade-left,.anim-fade-right,.anim-scale-in,.anim-reveal')
  ].filter(el => !areaItems.has(el) && !teamCards.has(el));

  if (genericEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    genericEls.forEach(el => obs.observe(el));
  }

  // ===== ÁREAS — entrada escalonada =====
  const areasGrid = document.getElementById('areas-grid');
  if (areasGrid) {
    const areasObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = [...entry.target.querySelectorAll('.area-item')]
            .filter(el => window.getComputedStyle(el).display !== 'none');
          items.forEach((item, i) => setTimeout(() => item.classList.add('area-in'), i * 55));
          areasObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    areasObs.observe(areasGrid);
  }

  // ===== TEAM CARDS — stagger por grid =====
  document.querySelectorAll('#team .grid').forEach(grid => {
    const cardObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = [...entry.target.querySelectorAll('.anim-card')];
          cards.forEach((card, i) => setTimeout(() => card.classList.add('is-visible'), i * 100));
          cardObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    cardObs.observe(grid);
  });

  // ===== HERO PARALLAX =====
  const heroBg = document.getElementById('hero-bg');
  if (heroBg) {
    const vh = window.innerHeight;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < vh) heroBg.style.transform = `translateY(${y * 0.28}px) scale(1.05)`;
    }, { passive: true });
    heroBg.style.transform = 'scale(1.05)';
  }

  // ===== HEADER HIDE/SHOW ON SCROLL =====
  const nav = document.querySelector('nav');
  let lastScrollY = 0, ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 100) {
          nav.classList.toggle('header-hidden', y > lastScrollY);
        } else {
          nav.classList.remove('header-hidden');
        }
        lastScrollY = y;
        ticking = false;
      });
      ticking = true;
    }
  });
})();
