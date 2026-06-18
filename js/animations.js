/* ============================================
   ANIMATIONS.JS - Scroll-Triggered Animations
   ============================================ */

(function() {
  'use strict';

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Portfolio filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter cards
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';

        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Code Rain Easter Egg (Konami Code)
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                       'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                       'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        triggerCodeRain();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function triggerCodeRain() {
    const rainCanvas = document.createElement('canvas');
    rainCanvas.className = 'code-rain-canvas';
    rainCanvas.width = window.innerWidth;
    rainCanvas.height = window.innerHeight;
    document.body.appendChild(rainCanvas);

    const rainCtx = rainCanvas.getContext('2d');
    const columns = Math.floor(window.innerWidth / 20);
    const drops = [];
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let rainAnimationId;
    let startTime = Date.now();

    function drawRain() {
      rainCtx.fillStyle = 'rgba(18, 8, 0, 0.05)';
      rainCtx.fillRect(0, 0, rainCanvas.width, rainCanvas.height);

      rainCtx.fillStyle = '#ED7A36';
      rainCtx.font = '15px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        rainCtx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > rainCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      if (Date.now() - startTime > 10000) {
        cancelAnimationFrame(rainAnimationId);
        rainCanvas.remove();
        return;
      }

      rainAnimationId = requestAnimationFrame(drawRain);
    }

    drawRain();
  }
})();
