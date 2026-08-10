document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Lenis Smooth Scrolling ---
  const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    smoothTouch: false
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Smooth scroll to anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target);
      }
    });
  });

  // --- 2. Intersection Observer for fade-up animations ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.fade-up');
  animatedElements.forEach(el => observer.observe(el));

  // --- 3. FAQ Accordion Logic ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Prevent default to allow custom animation if needed, or let details behave naturally
      const icon = item.querySelector('.faq-icon');
      if (item.hasAttribute('open')) {
        // Will close
        icon.textContent = '+';
      } else {
        // Will open
        icon.textContent = '-';
      }
    });
  });
});
