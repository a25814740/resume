import { nextTick, onBeforeUnmount, onMounted, type Ref } from 'vue';
import { useReducedMotion } from './useReducedMotion';

export function useReveal(rootRef: Ref<HTMLElement | null>) {
  const prefersReducedMotion = useReducedMotion();
  let observer: IntersectionObserver | null = null;
  let hashChangeCleanup: (() => void) | null = null;

  const markVisibleInViewport = (targets: HTMLElement[]) => {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    targets.forEach((target) => {
      const rect = target.getBoundingClientRect();
      const isVisible = rect.top < viewportHeight && rect.bottom > 0;

      if (isVisible) {
        target.classList.add('is-visible');
        observer?.unobserve(target);
      }
    });
  };

  const scrollToHashTarget = () => {
    const hash = window.location.hash;
    if (!hash) return;

    const target = document.querySelector<HTMLElement>(hash);
    if (!target) return;

    window.scrollTo({
      top: Math.max(target.offsetTop - 24, 0),
      left: 0,
      behavior: 'auto',
    });
  };

  const revealHashSection = (targets: HTMLElement[]) => {
    const hash = window.location.hash;
    if (!hash) return;

    const section = document.querySelector<HTMLElement>(hash);
    section
      ?.querySelectorAll<HTMLElement>('[data-reveal]')
      .forEach((target) => {
        target.classList.add('is-visible');
        observer?.unobserve(target);
      });

    markVisibleInViewport(targets);
  };

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

    const syncHashState = () => {
      scrollToHashTarget();
      revealHashSection(revealTargets);
    };

    markVisibleInViewport(revealTargets);
    syncHashState();
    root.classList.add('reveal-ready');

    requestAnimationFrame(syncHashState);
    setTimeout(syncHashState, 80);
    setTimeout(syncHashState, 320);

    const handleHashChange = () => {
      requestAnimationFrame(syncHashState);
      setTimeout(syncHashState, 80);
    };

    window.addEventListener('hashchange', handleHashChange);
    hashChangeCleanup = () => window.removeEventListener('hashchange', handleHashChange);
  });

  onBeforeUnmount(() => {
    rootRef.value?.classList.remove('reveal-ready');
    observer?.disconnect();
    hashChangeCleanup?.();
  });
}
