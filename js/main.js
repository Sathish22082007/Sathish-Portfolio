/* ============================================
   MAIN.JS - Core Functionality
   ============================================ */

(function() {
  'use strict';

  // Scroll Progress Bar
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const formGroups = contactForm.querySelectorAll('.form-group');

      formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        group.classList.remove('error');

        if (!input.value.trim()) {
          group.classList.add('error');
          isValid = false;
        }

        if (input.type === 'email' && input.value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            group.classList.add('error');
            isValid = false;
          }
        }
      });

      if (isValid) {
        const name = encodeURIComponent(document.getElementById('name').value);
        const email = encodeURIComponent(document.getElementById('email').value);
        const phone = encodeURIComponent(document.getElementById('phone').value);
        const message = encodeURIComponent(document.getElementById('message').value);
        const whatsappURL = `https://wa.me/919894255579?text=Name:%20${name}%0APhone:%20${phone}%0AEmail:%20${email}%0AMessage:%20${message}`;
        window.open(whatsappURL, '_blank');
      }
    });
  }

  // Navbar Height CSS Variable
  function updateNavbarHeight() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      const height = navbar.offsetHeight;
      document.documentElement.style.setProperty('--navbar-height', height + 'px');
    }
  }

  updateNavbarHeight();
  window.addEventListener('resize', updateNavbarHeight);

  console.log('🚀 Sathish R Portfolio - All systems loaded!');
})();
