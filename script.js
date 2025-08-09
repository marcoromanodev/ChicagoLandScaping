function initMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.mobile-menu .close-btn');

  if (!mobileMenu || !hamburger) return;

  // Toggle mobile menu on hamburger click
  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    mobileMenu.classList.toggle('show');
    hamburger.classList.toggle('active');
  });

  // Close mobile menu on outside click
  window.addEventListener('click', function (event) {
    if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
      mobileMenu.classList.remove('show');
      hamburger.classList.remove('active');
    }
  });

  // Close menu on close button click
  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileMenu.classList.remove('show');
      hamburger.classList.remove('active');
    });
  }

  // Prevent closing when clicking inside the menu
  mobileMenu.addEventListener('click', function (e) {
    e.stopPropagation();
  });
}

function initSectionObserver() {
  const sections = document.querySelectorAll('section[id]');
  const options = { threshold: 0.6 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll(`a[href="#${id}"]`).forEach(link => {
        if (entry.isIntersecting) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    });
  }, options);

  sections.forEach(section => observer.observe(section));
}

function init() {
  initMobileMenu();
  initSectionObserver();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
