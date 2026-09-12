/* ═══════════════════════════════════════════════════════════════
   MAIN JAVASCRIPT — Jezrael Tovar Portfolio
   All interactivity, animations, and dynamic behavior
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // ─── Initialize AOS (Animate On Scroll) ─────────────────────
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
    delay: 0,
  });

  // ─── Initialize Lucide Icons ────────────────────────────────
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ─── Set Current Year in Footer ─────────────────────────────
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─── Dynamic Greeting ───────────────────────────────────────
  const greetingEl = document.getElementById('dynamic-greeting');
  if (greetingEl) {
    const hour = new Date().getHours();
    let greeting;
    if (hour >= 5 && hour < 12) greeting = '☀️ Buenos días — Disponible para proyectos';
    else if (hour >= 12 && hour < 18) greeting = '🌤️ Buenas tardes — Disponible para proyectos';
    else greeting = '🌙 Buenas noches — Disponible para proyectos';
    greetingEl.textContent = greeting;
  }

  // ─── Navbar Scroll Effect ───────────────────────────────────
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Initial check

  // ─── Active Nav Link Highlight ──────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ─── Mobile Menu Toggle ─────────────────────────────────────
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerLines = mobileMenuBtn?.querySelector('.hamburger-lines');
  let menuOpen = false;

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;
      if (menuOpen) {
        mobileMenu.classList.remove('mobile-menu-closed');
        mobileMenu.classList.add('mobile-menu-open');
        hamburgerLines.classList.add('hamburger-active');
      } else {
        mobileMenu.classList.remove('mobile-menu-open');
        mobileMenu.classList.add('mobile-menu-closed');
        hamburgerLines.classList.remove('hamburger-active');
      }
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('mobile-menu-open');
        mobileMenu.classList.add('mobile-menu-closed');
        hamburgerLines.classList.remove('hamburger-active');
      });
    });
  }

  // ─── Counter Animation ──────────────────────────────────────
  const counters = document.querySelectorAll('.counter');

  function animateCounters() {
    counters.forEach((counter) => {
      if (counter.dataset.animated) return;

      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        counter.dataset.animated = 'true';
        const target = parseInt(counter.dataset.target, 10);
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          counter.textContent = current + (target > 5 ? '+' : '°');
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        }
        requestAnimationFrame(updateCounter);
      }
    });
  }

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters(); // Check on load

  // ─── Skill Bars Animation ───────────────────────────────────
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      if (bar.classList.contains('animated')) return;

      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
        const width = bar.dataset.width;
        bar.classList.add('animated');
        // Small delay for visual effect
        setTimeout(() => {
          bar.style.width = width + '%';
        }, 200);
      }
    });
  }

  window.addEventListener('scroll', animateSkillBars, { passive: true });
  animateSkillBars(); // Check on load

  // ─── Particles Canvas Background ───────────────────────────
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.hue = Math.random() > 0.5 ? 180 : 270; // cyan or violet
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle =
          this.hue === 180
            ? `rgba(0, 240, 255, ${this.opacity})`
            : `rgba(139, 92, 246, ${this.opacity})`;
        ctx.fill();
      }
    }

    function initParticles() {
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.1;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      animationId = requestAnimationFrame(animateParticles);
    }

    // Use ResizeObserver for better performance
    resizeCanvas();
    initParticles();
    animateParticles();

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        initParticles();
      }, 250);
    });

    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animateParticles();
      }
    });
  }

  // ─── Smooth Scroll for Anchor Links ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // ─── Tilt Effect on Profile Card (Desktop Only) ─────────────
  const profileCard = document.querySelector('.profile-card');
  if (profileCard && window.matchMedia('(hover: hover)').matches) {
    profileCard.addEventListener('mousemove', (e) => {
      const rect = profileCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    profileCard.addEventListener('mouseleave', () => {
      profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      profileCard.style.transition = 'transform 0.5s ease';
    });

    profileCard.addEventListener('mouseenter', () => {
      profileCard.style.transition = 'none';
    });
  }
});
