<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const progress = ref(0);

const updateProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
};

onMounted(() => {
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateProgress);
});
</script>

<template>
  <div class="scroll-progress" aria-hidden="true">
    <span :style="{ transform: `scaleX(${progress})` }"></span>
  </div>
</template>
