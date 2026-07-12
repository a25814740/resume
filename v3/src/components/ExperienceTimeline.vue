<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { experiences } from '../data/resume';

const activeIndex = ref(0);
const itemRefs = ref<HTMLElement[]>([]);
let observer: IntersectionObserver | null = null;

function setItemRef(element: unknown, index: number) {
  if (element instanceof HTMLElement) {
    itemRefs.value[index] = element;
  }
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        activeIndex.value = Number((entry.target as HTMLElement).dataset.index ?? 0);
      });
    },
    {
      rootMargin: '-35% 0px -45% 0px',
      threshold: 0.1,
    },
  );

  itemRefs.value.forEach((element) => observer?.observe(element));
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <section id="experience" class="experience-section section-shell" data-reveal>
    <div class="timeline-sticky">
      <p class="section-kicker">工作經歷</p>
      <h2>{{ experiences[activeIndex]?.company }}</h2>
      <p>{{ experiences[activeIndex]?.period }}</p>
    </div>

    <div class="timeline-list">
      <article
        v-for="(experience, index) in experiences"
        :key="`${experience.company}-${experience.period}`"
        :ref="(element) => setItemRef(element, index)"
        class="timeline-item"
        :class="{ 'is-active': activeIndex === index, 'is-secondary': experience.secondary }"
        :data-index="index"
      >
        <time>{{ experience.period }}</time>
        <div>
          <h3>{{ experience.company }}</h3>
          <p class="timeline-role">{{ experience.role }}</p>
          <p>{{ experience.summary }}</p>
          <ul class="chip-list">
            <li v-for="tag in experience.tags" :key="tag">{{ tag }}</li>
          </ul>
        </div>
      </article>
    </div>
  </section>
</template>
