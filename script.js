document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.querySelector('.mobile-menu');
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.mobile-menu .close-btn');

  if (!mobileMenu) {
    console.error("Mobile menu not found!");
    return;
  }
  if (!hamburger) {
    console.error("Hamburger icon not found!");
    return;
  }

  // Toggle mobile menu visibility when the hamburger icon is clicked
  hamburger.addEventListener('click', function (e) {
    console.log("Hamburger clicked");
    e.stopPropagation();
    mobileMenu.classList.toggle('show');
    hamburger.classList.toggle('active');
    console.log("Mobile menu class list:", mobileMenu.classList);
  });

  // Close the mobile menu when clicking outside of it
  window.addEventListener('click', function (event) {
    if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
      mobileMenu.classList.remove('show');
      hamburger.classList.remove('active');
      console.log("Mobile menu closed");
    }
  });

  // Close the menu when clicking the close button (if it exists)
  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileMenu.classList.remove('show');
      hamburger.classList.remove('active');
      console.log("Close button clicked - menu closed");
    });
  }

  // Prevent clicks inside the mobile menu from closing it
  mobileMenu.addEventListener('click', function (e) {
    e.stopPropagation();
  });
});
