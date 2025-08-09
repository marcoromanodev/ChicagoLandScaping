function initMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.mobile-menu .close-btn');

  if (!mobileMenu || !hamburger) return;

  const menuLinks = mobileMenu.querySelectorAll('a');

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

  // Highlight clicked link and persist menu state across pages
  menuLinks.forEach(link => {
    link.addEventListener('click', function () {
      menuLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      const href = this.getAttribute('href');
      if (href && !href.startsWith('#')) {
        localStorage.setItem('keepMobileMenuOpen', 'true');
        localStorage.setItem('activeLink', href);
      }
    });
  });
}

function initSectionObserver() {
  const sections = document.querySelectorAll('section[id]');
  const options = { threshold: 0.3 };

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
  highlightCurrentPage();
  openMenuIfFlag();
  initCarousels();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function highlightCurrentPage() {
  const path = window.location.pathname.split('/').pop();
  if (path && path !== 'index.html') {
    document.querySelectorAll(`a[href='${path}']`).forEach(link => {
      link.classList.add('active');
    });
  } else {
    document.querySelectorAll("a[href='#about']").forEach(link => {
      link.classList.add('active');
    });
  }
}


function openMenuIfFlag() {
  if (localStorage.getItem('keepMobileMenuOpen') === 'true') {
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    if (mobileMenu && hamburger) {
      mobileMenu.classList.add('show');
      hamburger.classList.add('active');
      const href = localStorage.getItem('activeLink');
      if (href) {
        mobileMenu.querySelectorAll(`a[href='${href}']`).forEach(link => {
          link.classList.add('active');
        });
      }
    }
    localStorage.removeItem('keepMobileMenuOpen');
    localStorage.removeItem('activeLink');
  }
}

function initCarousels() {
  document.querySelectorAll('.carousel-container').forEach(container => {
    const carousel = container.querySelector('.carousel-images');
    const slides = container.querySelectorAll('.carousel-img');
    const leftArrow = container.querySelector('.left-arrow');
    const rightArrow = container.querySelector('.right-arrow');

    if (!carousel || slides.length === 0) return;

    const imagesToShow = parseInt(container.getAttribute('data-images-to-show')) || 1;
    let currentIndex = 0;
    let imageWidth = slides[0].clientWidth;

    function updateCarousel() {
      const newTransformValue = -currentIndex * imageWidth;
      carousel.style.transform = `translateX(${newTransformValue}px)`;
    }

    rightArrow.addEventListener('click', () => {
      currentIndex++;
      if (currentIndex > slides.length - imagesToShow) {
        currentIndex = 0;
      }
      updateCarousel();
    });

    leftArrow.addEventListener('click', () => {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = Math.max(slides.length - imagesToShow, 0);
      }
      updateCarousel();
    });

    window.addEventListener('resize', () => {
      imageWidth = slides[0].clientWidth;
      updateCarousel();
    });
  });
}
