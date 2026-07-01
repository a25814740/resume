<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { experiences } from '../data/resume';
import { useReducedMotion } from '../composables/useReducedMotion';

const activeIndex = ref(0);
const timelineRef = ref(null);
const prefersReducedMotion = useReducedMotion();
let observer = null;

onMounted(async () => {
  await nextTick();
  if (prefersReducedMotion.value || !timelineRef.value || !('IntersectionObserver' in window)) return;

  const items = timelineRef.value.querySelectorAll('.timeline-item');
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeIndex.value = Number(entry.target.getAttribute('data-index'));
        }
      });
    },
    { rootMargin: '-35% 0px -45% 0px', threshold: 0.2 },
  );

  items.forEach((item) => observer.observe(item));
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <section id="experience" class="section experience-section" aria-labelledby="experience-title">
    <div class="section-heading" data-reveal>
      <p class="eyebrow">Experience</p>
      <h2 id="experience-title">工作經歷</h2>
      <p class="section-intro">
        以前端開發與網頁應用經驗為主軸，服務現場經歷作為理解真實使用者與溝通情境的補充。
      </p>
    </div>

    <div ref="timelineRef" class="timeline-list">
      <article
        v-for="(item, index) in experiences"
        :key="`${item.company}-${item.period}`"
        class="timeline-item"
        :class="{ active: activeIndex === index, supporting: item.supporting }"
        :data-index="index"
      >
        <time>{{ item.period }}</time>
        <div class="timeline-content">
          <span class="card-index">0{{ index + 1 }}</span>
          <h3>{{ item.role }}</h3>
          <p>{{ item.company }}</p>
          <ul>
            <li v-for="point in item.points" :key="point">{{ point }}</li>
          </ul>
        </div>
      </article>
    </div>
  </section>
</template>
