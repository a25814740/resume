<script setup lang="ts">
import type { Work } from '../../data/projects'
defineProps<{ work: Work }>()
</script>

<template>
  <aside class="work-info" data-work-info>
    <p class="work-info__eyebrow">OUR WORK</p>
    <p class="work-info__category">{{ work.category }}</p>
    <h2>{{ work.title }}</h2>
    <p class="work-info__description">{{ work.description }}</p>
    <ul aria-label="使用技術"><li v-for="tech in work.tech" :key="tech">{{ tech }}</li></ul>
    <a :href="work.link" target="_blank" rel="noopener noreferrer">View live site <span aria-hidden="true">↗</span></a>
  </aside>
</template>
