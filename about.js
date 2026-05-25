/* =========================================
   ABOUT.JS — Page-specific animations
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {
  initHeroAnimations();
});

/* ============================================================
   HERO SECTION ENTRANCE
   ============================================================ */
function initHeroAnimations() {
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline({ delay: 0.6 });

  // Image drops in from above
  tl.fromTo('.profile-image-container',
    { y: -60, opacity: 0, scale: 0.9 },
    { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.6)' }
  )
  .fromTo('.image-backdrop',
    { opacity: 0 },
    { opacity: 0.5, duration: 0.6, ease: 'power2.out' }, '-=0.6'
  )
  .fromTo('.hero-badge',
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2'
  )
  .fromTo('.animated-heading',
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3'
  )
  .fromTo('.developer-title',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4'
  )
  .fromTo('.hero-stats',
    { opacity: 0, y: 20, scale: 0.96 },
    { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.3'
  )
  .fromTo('.hero-cta',
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2'
  )
  .fromTo('.hero-socials',
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2'
  )
  .fromTo('.scroll-hint',
    { opacity: 0 },
    { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.1'
  );
}