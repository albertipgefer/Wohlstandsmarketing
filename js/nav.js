document.addEventListener('DOMContentLoaded', function() {
  const nav = document.getElementById('main-nav');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('nav-links');

  // Scrolled state
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  if (toggle) {
    toggle.addEventListener('click', function() {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isOpen);
      // Body-Scroll sperren wenn Menü offen
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // Smooth scroll für Anker-Links + Menü schließen
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navLinks) {
          navLinks.classList.remove('open');
          toggle.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });
});
