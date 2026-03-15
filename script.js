// === SKELETON LOADER ===
(function () {
  const skeleton = document.getElementById('skeleton-loader');
  if (!skeleton) return;

  const dismiss = () => {
    if (skeleton.classList.contains('fade-out')) return;
    try {
      skeleton.classList.add('fade-out');
      skeleton.style.pointerEvents = 'none';
      setTimeout(() => {
        if (skeleton.parentNode) skeleton.remove();
      }, 500);
    } catch (err) {
      skeleton.style.display = 'none';
    }
  };

  const delay = Math.floor(Math.random() * 800) + 400;

  // Use a hard timeout as the ultimate fail-safe
  const hardTimeout = setTimeout(dismiss, 2500);

  const triggerDismiss = () => {
    clearTimeout(hardTimeout);
    setTimeout(dismiss, delay);
  };

  if (document.readyState === 'complete') {
    triggerDismiss();
  } else {
    window.addEventListener('load', triggerDismiss);
    // Also use DOMContentLoaded as a faster fallback
    document.addEventListener('DOMContentLoaded', triggerDismiss);
  }
})();

// === INDEX PAGE ===
// Typewriter
const typewriterElement = document.getElementById('typewriter');
if (typewriterElement) {
  const text = 'Neel Shinde';
  let index = 0;
  function type() {
    if (index < text.length) {
      typewriterElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 150);
    } else {
      typewriterElement.classList.add('cursor-blink');
    }
  }
  document.addEventListener('DOMContentLoaded', type);
}

// Scroll Animations (Index)
(function() {
  const observe = () => {
    const elements = document.querySelectorAll('.fade-in-on-scroll');
    if (!elements.length) return;

    if (!window.IntersectionObserver) {
      elements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const skills = document.getElementById('skills-container');
          if (skills && entry.target.contains(skills)) {
            const chips = skills.querySelectorAll('.skill-chip');
            chips.forEach((chip, i) => {
              setTimeout(() => {
                chip.style.opacity = '1';
                chip.style.transform = 'translateY(0)';
              }, i * 100);
            });
          }
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  };
  
  observe();

  const chips = document.querySelectorAll('.skill-chip');
  if (chips.length > 0) {
    chips.forEach(chip => {
      chip.style.opacity = '0';
      chip.style.transform = 'translateY(10px)';
      chip.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
  }
})();



// Mobile menu toggle logic
(function() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  
  if (!mobileBtn || !mobileMenu || !mobileOverlay) return;

  const menuIcon = mobileBtn.querySelector('svg');
  const hamburgerPath = 'M4 6h16M4 12h16m-7 6h7';
  const closePath = 'M6 18L18 6M6 6l12 12';

  function toggleMenu(forceClose = false) {
    try {
      const isCurrentlyOpen = mobileMenu.classList.contains('open');
      const shouldBeOpen = forceClose ? false : !isCurrentlyOpen;

      mobileMenu.classList.toggle('open', shouldBeOpen);
      mobileOverlay.classList.toggle('hidden', !shouldBeOpen);
      mobileOverlay.classList.toggle('visible', shouldBeOpen);
      
      // Swap icon safely
      const path = menuIcon.querySelector('path');
      if (path) {
        path.setAttribute('d', shouldBeOpen ? closePath : hamburgerPath);
      }
      
      // Toggle body scroll
      document.body.style.overflow = shouldBeOpen ? 'hidden' : '';
    } catch (err) {
      console.error('Mobile menu toggle error:', err);
    }
  }

  mobileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });
  
  mobileOverlay.addEventListener('click', () => toggleMenu(true));

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  // Fail-safe: Close menu on window resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileMenu.classList.contains('open')) {
      toggleMenu(true);
    }
  });
})();

// === CERTIFICATE CAROUSEL ===
(function () {
  // Find the certificates section specifically (not projects)
  const certSection = document.getElementById('certificates-section');
  if (!certSection) return;

  const carousel = certSection.querySelector('.cert-carousel');
  if (!carousel) return;

  const wrapper = certSection.querySelector('.scroll-section-wrapper');
  if (!wrapper) return;

  const leftBtn  = wrapper.querySelector('.scroll-arrow-left');
  const rightBtn = wrapper.querySelector('.scroll-arrow-right');
  if (!leftBtn || !rightBtn) return;

  // Always show both arrows
  leftBtn.classList.remove('hidden-arrow');
  rightBtn.classList.remove('hidden-arrow');

  const cardW = () => {
    const card = carousel.querySelector('.cert-card');
    return card ? card.offsetWidth + 24 : 304;
  };

  leftBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -cardW(), behavior: 'smooth' });
  });
  rightBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: cardW(), behavior: 'smooth' });
  });

  // Scroll to real card on load
  const realCard = carousel.querySelector('.cert-real');
  if (realCard) {
    setTimeout(() => {
      realCard.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }, 300);
  }
})();

// === PROJECTS CAROUSEL ===
(function () {
  const wrapper = document.getElementById('projects-carousel-wrapper');
  if (!wrapper) return;

  const carousel = wrapper.querySelector('.proj-carousel');
  if (!carousel) return;

  const leftBtn  = wrapper.querySelector('.scroll-arrow-left');
  const rightBtn = wrapper.querySelector('.scroll-arrow-right');
  if (!leftBtn || !rightBtn) return;

  // Always show both arrows
  leftBtn.classList.remove('hidden-arrow');
  rightBtn.classList.remove('hidden-arrow');

  const cardW = () => {
    const card = carousel.querySelector('.project-card');
    return card ? card.offsetWidth + 24 : 344;
  };

  leftBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -cardW(), behavior: 'smooth' });
  });
  rightBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: cardW(), behavior: 'smooth' });
  });

  // Scroll to real card on load
  const realCard = carousel.querySelector('.proj-card-real');
  if (realCard) {
    setTimeout(() => {
      realCard.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }, 300);
  }
})();

// === CONTACT PAGE ===
// Scroll Reveal (Contact)
const revealElements = document.querySelectorAll('.fade-in-up');
if (revealElements.length > 0) {
  if (!window.IntersectionObserver) {
    revealElements.forEach(el => el.classList.add('visible'));
  } else {
    const observerContact = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          observerContact.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observerContact.observe(el));
  }
}

// Tilt mechanism (Contact)
const cardsContact = document.querySelectorAll('.tilt-card');
if (cardsContact.length > 0) {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouchDevice) {
    cardsContact.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }
}

// Form Handling (Contact)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const submitBtn = document.getElementById('submit-btn');
  const toastContainer = document.getElementById('toast-container');
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `glass-card px-6 py-4 flex items-center gap-3 pointer-events-auto shadow-2xl animate-bounce-in`;
    const icon = type === 'success' 
      ? `<svg class="text-green-400" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>`
      : `<svg class="text-red-400" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>`;
    toast.innerHTML = `${icon} <span class="text-sm font-semibold">${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  emailjs.init('xS28c-a_iQua924-z');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.classList.add('btn--loading');
    submitBtn.disabled = true;

    const templateParams = {
      user_name:  document.getElementById('name').value,
      user_email: document.getElementById('email').value,
      message:    document.getElementById('message').value,
    };

    emailjs.send('service_hv96ghr', 'template_6bidm5e', templateParams)
      .then(() => {
        showToast('Message sent successfully!');
        contactForm.reset();
      })
      .catch(() => {
        showToast('Something went wrong. Please try again.', 'error');
      })
      .finally(() => {
        submitBtn.classList.remove('btn--loading');
        submitBtn.disabled = false;
      });
  });
}



// === PROJECTS PAGE ===
// Filter Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
if (filterButtons.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');
      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cardWrapper = card.closest('[data-category]') || card;
        const category = cardWrapper.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('card--hidden');
          cardWrapper.style.position = '';
          cardWrapper.style.visibility = '';
        } else {
          card.classList.add('card--hidden');
        }
      });
    });
  });
}

// Modal Logic
const modal = document.getElementById('project-modal');
if (modal) {
  const mTitle = document.getElementById('modal-title');
  const mDesc = document.getElementById('modal-desc');
  const mImg = document.getElementById('modal-img');
  const projectData = {
    nebula: {
      title: "Nebula Store",
      desc: "A comprehensive solution for modern commerce. This project focused on building a lightning-fast frontend using Next.js, integrating Stripe for secure global payments, and leveraging a headless CMS for content agility. Features include multi-currency support, dynamic inventory tracking, and SEO optimization.",
      img: "https://placehold.co/600x400/1a1a1a/4F8EF7?text=E-Commerce+Platform"
    },
    aura: {
      title: "Aura Design System",
      desc: "Aura is a design language created to bridge the gap between design and development. It includes 50+ modular components, a robust typography scale, and semantic color tokens. Built for Figma first, then translated into a React-based UI library with full documentation.",
      img: "https://placehold.co/600x400/1a1a1a/A259FF?text=UI+Kit+System"
    },
    datapulse: {
      title: "DataPulse Analytics",
      desc: "Transforming raw data into actionable insights. DataPulse features a custom-built WebGL visualization engine capable of rendering thousands of data points without lag. Integrated with RESTful APIs to provide real-time monitoring for enterprise SaaS infrastructures.",
      img: "https://placehold.co/600x400/1a1a1a/4F8EF7?text=SaaS+Dashboard"
    },
    zen: {
      title: "ZenFlow App",
      desc: "Focusing on user well-being. ZenFlow uses native device capabilities to track focus sessions and provide haptic feedback during meditation. Built with React Native, it features a minimal UI that reduces cognitive load and promotes calm usage.",
      img: "https://placehold.co/600x400/1a1a1a/text-muted?text=Mobile+App"
    },
    legacy: {
      title: "Legacy Portfolio",
      desc: "My initial foray into creative development. This project was a playground for GSAP animations, SVG manipulation, and exploring the visual limits of CSS backdrops and filters. It remains a testament to my early curiosity in web aesthetics.",
      img: "https://placehold.co/600x400/1a1a1a/4F8EF7?text=Portfolio+v1"
    },
    quantix: {
      title: "Quantix Identity",
      desc: "Developing a brand for the future. Quantix required a visual identity that felt both deeply technical and accessible. The result was a geometric logo system paired with a high-contrast palette and custom-rendered 3D assets for marketing materials.",
      img: "https://placehold.co/600x400/1a1a1a/A259FF?text=Brand+Identity"
    }
  };
  window.openModal = function(id) {
    const data = projectData[id];
    mTitle.innerText = data.title;
    mDesc.innerText = data.desc;
    mImg.src = data.img;
    modal.showModal();
    document.body.style.overflow = 'hidden';
  }
  window.closeModal = function() {
    modal.close();
    document.body.style.overflow = 'auto';
  }
  modal.addEventListener('click', (e) => {
    if (e.target === modal) window.closeModal();
  });
}
