// Simple mobile drawer
const hamburger = document.querySelector('.hamburger');
const drawer = document.querySelector('#drawer');

function setDrawer(open) {
  if (!drawer) return;
  
  if (open) { 
    drawer.classList.add('open'); 
    drawer.removeAttribute('hidden'); 
    hamburger?.setAttribute('aria-expanded', 'true'); 
    document.body.style.overflow = 'hidden';
  } else { 
    drawer.classList.remove('open'); 
    drawer.setAttribute('hidden', ''); 
    hamburger?.setAttribute('aria-expanded', 'false'); 
    document.body.style.overflow = '';
  }
}

// Toggle drawer on hamburger click
hamburger?.addEventListener('click', () => {
  setDrawer(!(drawer && drawer.classList.contains('open')));
});

// Close drawer on link click or background click
drawer?.addEventListener('click', (e) => { 
  if (e.target.tagName === 'A' || e.target === drawer) {
    setDrawer(false);
  }
});

// Close drawer on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && drawer?.classList.contains('open')) {
    setDrawer(false);
  }
});

// Contact form (fake submit)
const form = document.querySelector('#contact-form');
const status = document.querySelector('#status');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = 'Message sent! Thanks for reaching out.';
  setTimeout(() => status.textContent = '', 3500);
  form.reset();
});

// Year
document.querySelector('#year').textContent = String(new Date().getFullYear());

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
      // Close mobile menu if open
      setDrawer(false);
    }
  });
});

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe cards for scroll animations
document.querySelectorAll('.card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Enhanced hamburger animation
hamburger?.addEventListener('click', () => {
  const spans = hamburger.querySelectorAll('span');
  spans.forEach((span, index) => {
    if (drawer?.classList.contains('open')) {
      // Transform to X
      if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
      if (index === 1) span.style.opacity = '0';
      if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      // Transform back to hamburger
      span.style.transform = 'none';
      span.style.opacity = '1';
    }
  });
});

// Add loading animation for images
document.querySelectorAll('.card .media').forEach(media => {
  if (media.tagName === 'IMG') {
    media.addEventListener('load', () => {
      media.style.opacity = '1';
    });
    media.style.opacity = '0';
    media.style.transition = 'opacity 0.3s ease';
  }
});

// Add parallax effect to hero blobs (optional performance enhancement)
let ticking = false;

function updateBlobPositions() {
  const scrollY = window.pageYOffset;
  const blobs = document.querySelectorAll('.blob');
  
  blobs.forEach((blob, index) => {
    const speed = 0.1 + (index * 0.05);
    blob.style.transform = `translateY(${scrollY * speed}px)`;
  });
  
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateBlobPositions);
    ticking = true;
  }
}

// Only add parallax on larger screens to avoid performance issues on mobile
if (window.innerWidth > 768) {
  window.addEventListener('scroll', requestTick);
}

// Form validation enhancement
const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');

inputs.forEach(input => {
  input.addEventListener('blur', () => {
    if (input.hasAttribute('required') && !input.value.trim()) {
      input.parentElement.style.borderColor = 'rgba(239, 68, 68, 0.5)';
    } else {
      input.parentElement.style.borderColor = '';
    }
  });
  
  input.addEventListener('input', () => {
    // Reset error state on input
    input.parentElement.style.borderColor = '';
  });
});

// Add resize handler to manage responsive behavior
window.addEventListener('resize', () => {
  // Close drawer on resize to desktop view
  if (window.innerWidth >= 880 && drawer?.classList.contains('open')) {
    setDrawer(false);
  }
});

// Preload critical images for better performance
function preloadImages() {
  const imageUrls = [
    './image/FirstWeb.jpg',
    './image/SP Mock Web.jpg', 
    './image/tiktactoe.jpg',
    './image/Pomodoro.jpg',
    './image/BugTrackr.jpg'
  ];
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

// Preload images when page loads
window.addEventListener('load', preloadImages);