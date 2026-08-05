export function revealOnScroll(selectors: string): void {
  const elements = document.querySelectorAll<HTMLElement>(selectors);
  if (elements.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('animate-in'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  );

  elements.forEach((el) => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}
