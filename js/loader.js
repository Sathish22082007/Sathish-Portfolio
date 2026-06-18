/* ============================================
   LOADER.JS - Preloader Animation Sequence
   ============================================ */

(function() {
  'use strict';

  const preloader = document.getElementById('preloader');
  const typedElement = document.getElementById('preloader-typed');
  const nameText = 'SATHISH R';
  let charIndex = 0;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function typeWriter() {
    if (prefersReducedMotion) {
      typedElement.textContent = nameText;
      return;
    }

    if (charIndex < nameText.length) {
      typedElement.textContent += nameText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 50);
    }
  }

  function hidePreloader() {
    if (prefersReducedMotion) {
      preloader.classList.add('removed');
      document.body.style.overflow = '';
      return;
    }

    preloader.classList.add('hidden');

    setTimeout(() => {
      preloader.classList.add('removed');
      document.body.style.overflow = '';

      // Trigger hero animations
      document.querySelectorAll('.hero-greeting, .hero-name-line, .hero-trust-badge, .hero-tagline, .hero-ctas, .trust-card').forEach(el => {
        el.style.animationPlayState = 'running';
      });
    }, 300);
  }

  // Initialize
  document.body.style.overflow = 'hidden';

  if (prefersReducedMotion) {
    // Instant fade for reduced motion
    setTimeout(hidePreloader, 1000);
  } else {
    // Normal sequence: 2.5s total
    // 0.3s - start logo draw (CSS handles this)
    // 0.8s - start typing
    setTimeout(typeWriter, 800);
    // 2.5s - hide preloader
    setTimeout(hidePreloader, 2500);
  }
})();
