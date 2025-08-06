document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.querySelector('.mobile-menu');
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.mobile-menu .close-btn');

  // Ensure required elements are present
  if (!mobileMenu || !hamburger) {
    console.error("Error: .mobile-menu or .hamburger not found in DOM.");
    return;
  }

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
});
