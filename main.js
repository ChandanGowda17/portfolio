// Theme Toggle
(function setupThemeToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  
  if (saved === 'light') {
    root.setAttribute('data-theme', 'light');
    toggle.textContent = '🌙';
  } else {
    toggle.textContent = '☀️';
  }
  
  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'light' ? null : 'light';
    
    if (next) {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      toggle.textContent = '🌙';
    } else {
      root.removeAttribute('data-theme');
      localStorage.removeItem('theme');
      toggle.textContent = '☀️';
    }
  });
})();

// Mobile Navigation
(function setupNavToggle() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('nav-menu');
  
  if (!toggle || !menu) return;
  
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('active');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  
  // Close menu when clicking on links
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Smooth Scroll for same-page links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    const id = href && href.slice(1);
    const target = id && document.getElementById(id);
    
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', href);
    }
  });
});

// Scroll Animations
(function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Animate element
          entry.target.animate(
            [
              { opacity: 0, transform: 'translateY(30px)' },
              { opacity: 1, transform: 'translateY(0)' }
            ],
            { 
              duration: 600, 
              easing: 'ease-out', 
              fill: 'forwards' 
            }
          );
          
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  
  // Observe all sections and cards
  document.querySelectorAll('.section, .card, .skill-card, .stat-card, .project-card, .cert-item, .service-item').forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
})();

// Initialize EmailJS
(function initEmailJS() {
  (function() {
    emailjs.init("vO9wdzxQGYNng6jAm"); // You'll need to replace this with your actual EmailJS public key
  })();
})();

// Contact Form
(function setupContactForm() {
  const form = document.getElementById('contactForm');
  const messageEl = document.getElementById('formMessage');
  
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    
    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        'service_tq5flw4', // You'll need to replace this with your EmailJS service ID
        'template_3bxhx08', // You'll need to replace this with your EmailJS template ID
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          to_email: 'chandangowda4054@gmail.com'
        }
      );
      
      // Show success message
      messageEl.textContent = 'Message sent successfully! I\'ll get back to you soon.';
      messageEl.className = 'form-msg success';
      form.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      console.error('Error details:', error.text || error.message);
      // Show error message
      messageEl.textContent = `Failed to send message: ${error.text || error.message}. Please try again or email directly at chandangowda4054@gmail.com`;
      messageEl.className = 'form-msg error';
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      
      // Hide message after 5 seconds
      setTimeout(() => {
        messageEl.textContent = '';
        messageEl.className = 'form-msg';
      }, 5000);
    }
  });
})();

// Navbar scroll effect
(function setupNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      navbar.style.background = 'var(--navbar-bg)';
      navbar.style.backdropFilter = 'blur(20px)';
    } else {
      navbar.style.background = 'var(--navbar-bg)';
      navbar.style.backdropFilter = 'blur(10px)';
    }
    
    lastScrollY = currentScrollY;
  });
})();

// Typing effect for hero role
(function setupTypingEffect() {
  const roleElement = document.querySelector('.hero-role');
  if (!roleElement) return;
  
  const roles = ['Full Stack Developer', 'AI Enthusiast', 'Creative Coder'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      roleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      roleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next
    }
    
    setTimeout(typeRole, typingSpeed);
  }
  
  // Start typing effect
  setTimeout(typeRole, 1000);
})();

// Footer year
document.getElementById('year').textContent = String(new Date().getFullYear());

// Add parallax effect to floating orbs
(function setupParallax() {
  const orbs = document.querySelectorAll('.gradient-orb');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    orbs.forEach((orb, index) => {
      const speed = index % 2 === 0 ? 0.5 : 0.3;
      orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
})();

// Add hover effect to project cards
(function setupProjectCardEffects() {
  const cards = document.querySelectorAll('.project-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
})();

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add loaded class to body for transitions
  document.body.classList.add('loaded');
  
  // Add stagger animation delays
  document.querySelectorAll('.fade-in').forEach((el, index) => {
    el.classList.add(`stagger-${(index % 6) + 1}`);
  });
});
