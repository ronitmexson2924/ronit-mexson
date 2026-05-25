/* =========================================
   SCRIPT.JS — Ronit Mexson Portfolio
   Core interactions & animations
   ========================================= */

// Register GSAP plugins
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener('DOMContentLoaded', function () {
  initPageTransition();
  initCustomCursor();
  initHeader();
  initMobileMenu();
  initTypingEffect();
  initCounters();
  initScrollAnimations();
  initSmoothScroll();
  initRippleButtons();
});

/* ============================================================
   PAGE TRANSITION
   ============================================================ */
function initPageTransition() {
  const pt = document.querySelector('.page-transition');
  if (!pt) return;

  gsap.to(pt, {
    duration: 0.7,
    scaleY: 0,
    transformOrigin: 'top',
    ease: 'power4.inOut',
    delay: 0.05
  });

  document.body.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    const target = link.getAttribute('target');
    if (!href || target === '_blank' || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return;
    if (link.hostname === window.location.hostname) {
      e.preventDefault();
      gsap.to(pt, {
        duration: 0.5,
        scaleY: 1,
        transformOrigin: 'bottom',
        ease: 'power4.inOut',
        onComplete: () => { window.location.href = href; }
      });
    }
  });
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  if (!cursor || !follower) return;

  let visible = false;

  document.addEventListener('mousemove', (e) => {
    if (!visible) {
      gsap.to([cursor, follower], { autoAlpha: 1, duration: 0.3 });
      visible = true;
    }
    gsap.to(cursor,   { x: e.clientX, y: e.clientY, duration: 0.08 });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.25 });
  });

  document.querySelectorAll('a, button, .skill-category, .project-card, .contact-method').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(follower, { scale: 1.6, opacity: 0.6, duration: 0.2 });
      gsap.to(cursor,   { scale: 0.5, duration: 0.2 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(follower, { scale: 1, opacity: 0.5, duration: 0.2 });
      gsap.to(cursor,   { scale: 1, duration: 0.2 });
    });
  });

  document.addEventListener('mouseleave', () => {
    gsap.to([cursor, follower], { autoAlpha: 0, duration: 0.2 });
    visible = false;
  });
}

/* ============================================================
   HEADER — scroll state & active nav
   ============================================================ */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  // Scroll shadow
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const btn  = document.getElementById('mobileMenuBtn');
  const nav  = document.getElementById('mobileNav');
  const links = document.querySelectorAll('.mobile-nav-link');
  if (!btn || !nav) return;

  function toggle(force) {
    const open = force !== undefined ? force : !nav.classList.contains('open');
    btn.classList.toggle('open', open);
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    nav.setAttribute('aria-hidden', String(!open));
  }

  btn.addEventListener('click', () => toggle());
  links.forEach(link => link.addEventListener('click', () => toggle(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
}

/* ============================================================
   TYPING EFFECT
   ============================================================ */
function initTypingEffect() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const words = [
    'full-stack web apps.',
    'AI-powered tools.',
    'educational experiences.',
    'scalable backends.',
    'clean interfaces.'
  ];

  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let paused = false;

  function type() {
    const current = words[wordIdx];

    if (!deleting) {
      el.textContent = current.substring(0, ++charIdx);
      if (charIdx === current.length) {
        paused = true;
        setTimeout(() => { paused = false; deleting = true; }, 2000);
        return;
      }
    } else {
      el.textContent = current.substring(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
      }
    }

    if (!paused) setTimeout(type, deleting ? 45 : 90);
  }

  setTimeout(type, 800);
}

/* ============================================================
   ANIMATED COUNTERS
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1500;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ============================================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================================ */
function initScrollAnimations() {
  // Skill bars
  const skillLevels = document.querySelectorAll('.skill-level');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillLevels.forEach(el => skillObserver.observe(el));

  // Generic fade-up elements
  const fadeEls = document.querySelectorAll(
    '.about-content, .highlight-card, .skill-category, .learning-card, .project-card, .contact-method, .about-highlights'
  );

  if (typeof gsap !== 'undefined') {
    fadeEls.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          delay: (i % 3) * 0.1
        }
      );
    });

    // Section labels
    document.querySelectorAll('.section-label, .section-title').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' }
        }
      );
    });
  }
}

/* ============================================================
   SMOOTH SCROLL for anchor links
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = 80; // header height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   RIPPLE BUTTONS
   ============================================================ */
function initRippleButtons() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      const rect = this.getBoundingClientRect();
      ripple.style.left = `${e.clientX - rect.left - 50}px`;
      ripple.style.top  = `${e.clientY - rect.top - 50}px`;
      setTimeout(() => ripple.remove(), 700);
    });
  });
}