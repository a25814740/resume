import { nextTick, onBeforeUnmount, onMounted, type Ref } from 'vue';
import { useReducedMotion } from './useReducedMotion';

export function useReveal(rootRef: Ref<HTMLElement | null>) {
  const prefersReducedMotion = useReducedMotion();
  let observer: IntersectionObserver | null = null;

  onMounted(async () => {
    await nextTick();
    const root = rootRef.value;
    if (!root) return;

    const revealTargets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (prefersReducedMotion.value || !('IntersectionObserver' in window)) {
      revealTargets.forEach((target) => target.classList.add('is-visible'));
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer?.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.14 },
    );

    revealTargets.forEach((target) => observer?.observe(target));
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });
}
