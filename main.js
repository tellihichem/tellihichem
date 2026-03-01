/* ==========================================
   main.js – Hichem Telli GitHub Page
   ========================================== */

// ─── PARTICLE CANVAS ───
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = window.innerWidth;
  let H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  const NUM_PARTICLES = 70;
  const CONNECT_DIST = 160;

  const particles = Array.from({ length: NUM_PARTICLES }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2.5 + 0.8,
    alpha: Math.random() * 0.5 + 0.2,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Move
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100, 160, 255, ${p.alpha})`;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const opacity = (1 - dist / CONNECT_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(79, 142, 255, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  });
})();

// ─── NAVBAR SCROLL ───
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Smooth close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('nav-links-list')?.classList.remove('open');
    });
  });
})();

// ─── HAMBURGER MENU ───
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    links.classList.toggle('open');
  });
})();

// ─── TYPING EFFECT ───
(function initTyper() {
  const el = document.getElementById('typed-title');
  if (!el) return;

  const phrases = [
    'Computer Vision Researcher',
    'Generative AI Engineer',
    'Autonomous Driving AI',
    'Deep Learning Practitioner',
    'Vision Large Language Models',
    'Artificial General Intelligence',
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const DELAY_TYPE = 70;
  const DELAY_DELETE = 35;
  const DELAY_PAUSE = 2000;
  const DELAY_START = 400;

  function type() {
    const phrase = phrases[phraseIdx];
    if (deleting) {
      el.textContent = phrase.slice(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, DELAY_START);
        return;
      }
      setTimeout(type, DELAY_DELETE);
    } else {
      el.textContent = phrase.slice(0, charIdx++);
      if (charIdx > phrase.length) {
        deleting = true;
        setTimeout(type, DELAY_PAUSE);
        return;
      }
      setTimeout(type, DELAY_TYPE);
    }
  }

  setTimeout(type, 600);
})();

// ─── SCROLL REVEAL ANIMATIONS ───
(function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.pub-card, .research-card, .timeline-card, .skill-group, .contact-card, .about-text, .about-visual, .highlight-item'
  );

  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
  });

  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.55s ease ${i * 0.04}s, transform 0.55s ease ${i * 0.04}s`;
    observer.observe(el);
  });

  // Add revealed class handling
  const style = document.createElement('style');
  style.textContent = `.revealed { opacity: 1 !important; transform: none !important; }`;
  document.head.appendChild(style);
})();

// ─── ACTIVE NAV LINK ───
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle(
            'active-nav',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(sec => observer.observe(sec));

  // Style active nav
  const style = document.createElement('style');
  style.textContent = `.nav-link.active-nav { color: #fff !important; background: rgba(79, 142, 255, 0.14) !important; }`;
  document.head.appendChild(style);
})();

// ─── ANIMATED STAT COUNTERS ───
(function initCounters() {
  const stats = [
    { selector: '.stat-num:nth-of-type(1)', target: 7, suffix: '' },
    { selector: '.stat-num:nth-of-type(2)', target: 65, suffix: '+' },
    { selector: '.stat-num:nth-of-type(3)', target: 5, suffix: '+' },
  ];

  const statNums = document.querySelectorAll('.stat-num');
  if (!statNums.length) return;

  function animateCount(el, targetText) {
    const isSuffix = targetText.endsWith('+');
    const target = parseInt(targetText);
    const duration = 1500;
    const steps = 40;
    const interval = duration / steps;
    let current = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = Math.floor(current) + (isSuffix ? '+' : '');
      if (current >= target) clearInterval(timer);
    }, interval);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNums.forEach(el => {
          const original = el.textContent;
          animateCount(el, original);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) observer.observe(statsEl);
})();

// ─── CURSOR GLOW (OPTIONAL, DESKTOP ONLY) ───
(function initCursorGlow() {
  if (window.innerWidth < 1024) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(79,142,255,0.07) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);

  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
})();
