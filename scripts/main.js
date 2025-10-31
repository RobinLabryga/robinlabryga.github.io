/**
 * Robin Labryga - 2025
 */

'use strict';

// ===========================
// Mobile Navigation
// ===========================
class MobileNavigation {
  constructor() {
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.isOpen = false;
    this.init();
  }

  init() {
    this.bindEvents();
    this.setupKeyboardNavigation();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.navToggle.setAttribute('aria-expanded', this.isOpen.toString());
    this.navMenu.classList.toggle('nav-menu--open', this.isOpen);

    if (this.isOpen) {
      this.trapFocus();
      document.body.style.overflow = 'hidden';
    } else {
      this.releaseFocus();
      document.body.style.overflow = '';
    }
  }

  close() {
    if (this.isOpen) {
      this.toggle();
    }
  }

  trapFocus() {
    // Simple focus trap for mobile menu
    const focusableElements = this.navMenu.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }

  releaseFocus() {
    this.navToggle.focus();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  bindEvents() {
    this.navToggle?.addEventListener('click', () => this.toggle());

    // Close menu when clicking nav links
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.close());
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && 
          !this.navMenu.contains(e.target) && 
          !this.navToggle.contains(e.target)) {
        this.close();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && this.isOpen) {
        this.close();
      }
    });
  }
}

// ===========================
// Smooth Scrolling
// ===========================
class SmoothScroller {
  constructor() {
    this.init();
  }

  init() {
    // Enhanced smooth scrolling for anchor links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      this.scrollToElement(href);
    });
  }

  scrollToElement(selector) {
    const target = document.querySelector(selector);
    if (!target) return;

    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
    const targetPosition = target.offsetTop - headerHeight - 20;

    // Use modern scroll API with fallback
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    } else {
      // Fallback for older browsers
      this.animatedScrollTo(targetPosition);
    }

    // Update focus for accessibility
    target.setAttribute('tabindex', '-1');
    target.focus();
    target.addEventListener('blur', () => {
      target.removeAttribute('tabindex');
    }, { once: true });
  }

  animatedScrollTo(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  }

  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
}

// ===========================
// Scroll Animations
// ===========================
class ScrollAnimations {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
    } else {
      // Fallback: add animation classes immediately
      this.addFallbackAnimations();
    }
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
      '.section-title, .about-content, .project-card, .contact-content'
    );

    animatedElements.forEach(el => {
      el.classList.add('animate-on-scroll');
      this.observer.observe(el);
    });
  }

  addFallbackAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => el.classList.add('animate-in'));
  }
}

// ===========================
// Performance Optimization
// ===========================
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.preloadCriticalResources();
    this.optimizeScrollPerformance();
  }

  lazyLoadImages() {
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading is supported
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    } else {
      // Fallback for browsers without native lazy loading
      this.implementIntersectionObserverLazyLoading();
    }
  }

  implementIntersectionObserverLazyLoading() {
    if (!('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  preloadCriticalResources() {
    // Preload important resources
    const criticalResources = [
      { href: './styles/main.css', as: 'style' },
      { href: './scripts/main.js', as: 'script' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      document.head.appendChild(link);
    });
  }

  optimizeScrollPerformance() {
    let ticking = false;

    const updateScrollPosition = () => {
      // Add scroll-based optimizations here
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }
}

// ===========================
// Accessibility Enhancements
// ===========================
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupReducedMotion();
    this.enhanceKeyboardNavigation();
    this.setupFocusManagement();
  }

  setupReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    };

    mediaQuery.addEventListener('change', handleReducedMotion);
    handleReducedMotion(mediaQuery);
  }

  enhanceKeyboardNavigation() {
    // Add visible focus indicators
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  setupFocusManagement() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    skipLink?.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('#main-content');
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus();
        target.addEventListener('blur', () => {
          target.removeAttribute('tabindex');
        }, { once: true });
      }
    });
  }
}

// ===========================
// Error Handling & Analytics
// ===========================
class ErrorHandler {
  constructor() {
    this.init();
  }

  init() {
    this.setupGlobalErrorHandling();
    this.setupUnhandledPromiseRejection();
  }

  setupGlobalErrorHandling() {
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      // In a real application, you might send this to an error reporting service
    });
  }

  setupUnhandledPromiseRejection() {
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // Prevent the default browser behavior
      event.preventDefault();
    });
  }
}

// ===========================
// App Initialization
// ===========================
class App {
  constructor() {
    this.components = [];
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Initialize all components
      this.components = [
        new ErrorHandler(),
        new MobileNavigation(),
        new SmoothScroller(),
        new ScrollAnimations(),
        new PerformanceOptimizer(),
        new AccessibilityManager()
      ];

      console.log('✅ All components initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing components:', error);
    }
  }
}

// Start the application
new App();

// ===========================
// Service Worker Registration
// ===========================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// ===========================
// CSS Animation Classes
// ===========================
// Add these styles to your CSS for scroll animations
const animationStyles = `
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.reduce-motion .animate-on-scroll,
.reduce-motion .animate-in {
  transition: none;
  animation: none;
}

.keyboard-navigation *:focus {
  outline: 2px solid var(--color-primary) !important;
  outline-offset: 2px !important;
}
`;

// Inject animation styles if they don't exist
if (!document.querySelector('#animation-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'animation-styles';
  styleSheet.textContent = animationStyles;
  document.head.appendChild(styleSheet);
}
