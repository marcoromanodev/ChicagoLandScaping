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

  // Persist menu state across pages
  menuLinks.forEach(link => {
    link.addEventListener('click', function () {
      const href = this.getAttribute('href');
      if (href && !href.startsWith('#')) {
        localStorage.setItem('keepMobileMenuOpen', 'true');
        localStorage.setItem('activeLink', href);
      }
    });
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-menu a, .mobile-menu a');

  function activateSection() {
    let currentId = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', activateSection);
  activateSection();
}

function initNavLinkHighlight() {
  const allLinks = document.querySelectorAll('.desktop-menu a, .mobile-menu a');
  allLinks.forEach(link => {
    link.addEventListener('click', function () {
      allLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

function init() {
  initMobileMenu();
  initNavLinkHighlight();
  initScrollSpy();
  highlightCurrentPage();
  openMenuIfFlag();
  initCarousels();
  initLogoGlow();
  initReviewStars();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function highlightCurrentPage() {
  const path = window.location.pathname.split('/').pop();
  const hash = window.location.hash;
  const allLinks = document.querySelectorAll('.desktop-menu a, .mobile-menu a');
  allLinks.forEach(l => l.classList.remove('active'));

  if (hash) {
    document.querySelectorAll(`a[href='${hash}']`).forEach(link => {
      link.classList.add('active');
    });
  } else if (path && path !== 'index.html' && path !== '') {
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

function initLogoGlow() {
  const logo = document.querySelector('.logo-container img');
  if (!logo) return;
  logo.addEventListener('click', function () {
    logo.classList.add('glow');
    setTimeout(() => logo.classList.remove('glow'), 500);
  });
}

function initReviewStars() {
  const container = document.querySelector('.customer-reviews .star-rating');
  if (!container) return;
  const endpoint = 'https://example.com/api/reviews';
  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      const rating = parseFloat(data.rating) || 0;
      renderStars(container, rating);
    })
    .catch(() => {
      renderStars(container, 4.5);
    });
}

function renderStars(container, rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  container.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    if (i <= fullStars) {
      star.className = 'fas fa-star';
    } else if (i === fullStars + 1 && hasHalfStar) {
      star.className = 'fas fa-star-half-alt';
    } else {
      star.className = 'far fa-star';
    }
    container.appendChild(star);
  }
  container.querySelectorAll('i').forEach((star, index) => {
    star.style.animationDelay = `${(index + 1) * 0.1}s`;
  });
}
