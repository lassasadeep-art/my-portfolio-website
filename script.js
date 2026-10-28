/* ==========================================================================
   <DEV> LASITHA - INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Sticky Navigation & Scroll Spy ---
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const backToTopBtn = document.getElementById('backToTop');

  // Sticky header class toggle
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }

    // Scroll spy: Active nav item
    let currentSection = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // --- 2. Mobile Menu Toggle ---
  mobileToggle?.addEventListener('click', () => {
    mobileToggle.classList.toggle('open');
    navMenu?.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  // Close mobile menu when clicking any nav link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileToggle?.classList.remove('open');
      navMenu?.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });

  // --- 3. Floating Back To Top Button ---
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- 4. Resume Button Handler ---
  const resumeBtn = document.getElementById('resumeBtn');
  resumeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      const messageField = document.getElementById('userMessage');
      if (messageField) {
        messageField.value = 'Hi Lasitha, I am interested in viewing your detailed CV and discussing an opportunity.';
        messageField.focus();
      }
    }
  });

  // --- 5. Animated Number Counters (Intersection Observer) ---
  const counterElements = document.querySelectorAll('.counter-num');
  let animated = false;

  const countUp = (element) => {
    const targetText = element.getAttribute('data-target');
    const target = parseInt(targetText, 10);
    const duration = 2000;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
        if (target >= 1000) {
          element.textContent = (target >= 20000 ? Math.floor(target / 1000) + 'K+' : target.toLocaleString() + '+');
        } else {
          element.textContent = target + '+';
        }
      } else {
        if (target >= 1000) {
          element.textContent = Math.floor(current).toLocaleString();
        } else {
          element.textContent = Math.floor(current) + '+';
        }
      }
    }, stepTime);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterElements.forEach((counter) => countUp(counter));
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-counter-bar');
  if (statsSection) {
    counterObserver.observe(statsSection);
  }

  // --- 6. Contact Form Interactive Submission ---
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('userName')?.value.trim();
      const email = document.getElementById('userEmail')?.value.trim();
      const message = document.getElementById('userMessage')?.value.trim();

      if (!name || !email || !message) {
        if (formFeedback) {
          formFeedback.textContent = 'Please fill out all required fields.';
          formFeedback.className = 'form-feedback error';
        }
        return;
      }

      // Submit feedback simulation
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>SENDING...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        
        if (formFeedback) {
          formFeedback.innerHTML = `✓ Thank you <strong>${name}</strong>! Your message has been sent. Lasitha will reply to <em>${email}</em> promptly.`;
          formFeedback.className = 'form-feedback success';
        }
        
        contactForm.reset();

        setTimeout(() => {
          if (formFeedback) {
            formFeedback.style.display = 'none';
          }
        }, 8000);
      }, 1200);
    });
  }

  // --- 7. Subtle 3D Card Hover Effect ---
  const cards = document.querySelectorAll('.service-card, .project-card, .micro-stat-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

});
