<script setup lang="ts">
import { strengths } from '../data/resume';
</script>

<template>
  <section id="strengths" class="strength-section section-shell" data-reveal>
    <div class="section-heading compact">
      <p class="section-kicker">能力亮點</p>
      <h2>面試官可以快速掃讀的六個工作能力。</h2>
    </div>

    <div class="bento-grid">
      <article v-for="strength in strengths" :key="strength.title" class="bento-card" tabindex="0">
        <h3>{{ strength.title }}</h3>
        <p>{{ strength.description }}</p>
        <ul class="chip-list" aria-label="技術關鍵字">
          <li v-for="tag in strength.tags" :key="tag">{{ tag }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>
