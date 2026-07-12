import { onBeforeUnmount, onMounted, ref } from 'vue';

export function useReducedMotion() {
  const prefersReducedMotion = ref(false);
  let mediaQuery: MediaQueryList | null = null;

  const updateMotionPreference = (event?: MediaQueryListEvent) => {
    prefersReducedMotion.value = event ? event.matches : Boolean(mediaQuery?.matches);
  };

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);
  });

  onBeforeUnmount(() => {
    mediaQuery?.removeEventListener('change', updateMotionPreference);
  });

  return { prefersReducedMotion };
}
