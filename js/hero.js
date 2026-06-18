/* ============================================
   HERO.JS - Nebula Starfield, Particles, Typing, Marquee
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // STARFIELD + PARTICLE CANVAS
  // ============================================
  const canvas = document.getElementById('hero-canvas');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let backgroundStars = [];
  let mouseX = 0;
  let mouseY = 0;
  let animationId = null;

  // Config
  const CONNECTING_PARTICLE_COUNT = window.innerWidth < 768 ? 8 : 15;
  const BACKGROUND_STAR_COUNT = window.innerWidth < 768 ? 200 : 400;
  const CONNECTION_DISTANCE = 120;
  const MAX_CONNECTIONS = 2;
  const PARTICLE_COLOR = 'rgba(237, 122, 54, 0.15)';
  const LINE_COLOR = 'rgba(237, 122, 54, 0.06)';
  const MOUSE_REPEL_RADIUS = 80;
  const MOUSE_REPEL_FORCE = 0.3;

  function resizeCanvas() {
    const hero = document.getElementById('hero');
    const w = hero.offsetWidth;
    const h = hero.offsetHeight;
    canvas.width = w;
    canvas.height = h;
    createBackgroundStars();
  }

  function createBackgroundStars() {
    backgroundStars = [];
    for (let i = 0; i < BACKGROUND_STAR_COUNT; i++) {
      const starColors = [
        '255, 255, 255',
        '255, 255, 255',
        '255, 255, 240',
        '255, 240, 220',
        '255, 220, 200',
        '255, 200, 180',
        '237, 122, 54'
      ];
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      const r = Math.random();
      backgroundStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: r < 0.7 ? Math.random() * 0.8 + 0.2 : Math.random() * 1.2 + 0.8,
        baseOpacity: r < 0.7 ? Math.random() * 0.5 + 0.2 : Math.random() * 0.6 + 0.3,
        opacity: 0,
        twinkleSpeed: Math.random() * 0.015 + 0.003,
        twinklePhase: Math.random() * Math.PI * 2,
        color: color,
        isNoise: r < 0.7
      });
    }
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < CONNECTING_PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.8,
        connections: 0
      });
    }
  }

  function updateStars(time) {
    backgroundStars.forEach(star => {
      const twinkle = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.twinklePhase));
      star.opacity = star.baseOpacity * twinkle;
    });
  }

  function updateParticles() {
    particles.forEach(p => {
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_REPEL_RADIUS && dist > 0) {
        const force = (MOUSE_REPEL_RADIUS - dist) / MOUSE_REPEL_RADIUS * MOUSE_REPEL_FORCE;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }

      p.x += p.vx;
      p.y += p.vy;

      p.vx *= 0.99;
      p.vy *= 0.99;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      p.connections = 0;
    });
  }

  function drawStars() {
    for (let i = 0; i < backgroundStars.length; i++) {
      const star = backgroundStars[i];
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${star.color}, ${star.opacity})`;
      ctx.fill();
    }
  }

  function drawParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DISTANCE && 
            particles[i].connections < MAX_CONNECTIONS && 
            particles[j].connections < MAX_CONNECTIONS) {

          const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(237, 122, 54, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          particles[i].connections++;
          particles[j].connections++;
        }
      }
    }

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = PARTICLE_COLOR;
      ctx.fill();
    });
  }

  function animate(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateStars(time);
    drawStars();
    updateParticles();
    drawParticles();

    animationId = requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  resizeCanvas();
  createParticles();
  animate(0);

  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });

  // ============================================
  // PROFILE PHOTO PARALLAX
  // ============================================
  const photoContainer = document.querySelector('.hero-photo-container');

  if (photoContainer && window.innerWidth >= 1024) {
    document.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth / 2 - e.clientX) * 0.02;
      const y = (window.innerHeight / 2 - e.clientY) * 0.02;
      photoContainer.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
})();
