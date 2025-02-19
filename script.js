document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.querySelector('.mobile-menu');
  const hamburger = document.querySelector('.hamburger');

  if (!mobileMenu) {
    console.error("Mobile menu not found!");
  }
  if (!hamburger) {
    console.error("Hamburger icon not found!");
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

  // Prevent clicks inside the mobile menu from closing it
  mobileMenu.addEventListener('click', function (e) {
    e.stopPropagation();
  });
});
