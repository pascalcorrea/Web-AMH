(function() {

  // ===== HEADER PADDING ON SCROLL =====
  const navEl = document.querySelector('nav');
  if (navEl) {
    window.addEventListener('scroll', () => {
      const compact = window.scrollY > 60;
      navEl.style.paddingTop = compact ? '14px' : '24px';
      navEl.style.paddingBottom = compact ? '14px' : '24px';
    }, { passive: true });
  }

  // ===== ACTIVE NAV ON SCROLL =====
  const sections = document.querySelectorAll('#about, #areas, #team, #contact');
  const navLinks = document.querySelectorAll('nav a.nav-link');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(s => sectionObserver.observe(s));
  }

  // ===== SCROLL TO TOP BUTTON =====
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== DRAWER OVERLAY =====
  const overlay = document.getElementById('drawerOverlay');
  if (overlay) {
    overlay.addEventListener('click', () => {
      if (typeof toggleMenu === 'function') toggleMenu();
    });
  }

  // Patch toggleMenu to handle overlay
  const origToggleMenu = window.toggleMenu;
  window.toggleMenu = function() {
    origToggleMenu && origToggleMenu();
    const drawer = document.getElementById('mobileDrawer');
    const btn = document.querySelector('[aria-controls="mobileDrawer"]');
    const isOpen = drawer && drawer.classList.contains('open');
    if (overlay) overlay.classList.toggle('visible', isOpen);
    if (btn) btn.setAttribute('aria-expanded', String(isOpen));
  };

})();
