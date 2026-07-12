import { onBeforeUnmount, onMounted } from 'vue';
import { useReducedMotion } from './useReducedMotion';

export function useReveal(selector = '[data-reveal]') {
  const { prefersReducedMotion } = useReducedMotion();
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (prefersReducedMotion.value) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer?.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.16,
      },
    );

    elements.forEach((element) => observer?.observe(element));
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });
}
