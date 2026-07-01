<script setup>
import { strengths } from '../data/resume';
</script>

<template>
  <section id="strengths" class="section strength-section" aria-labelledby="strength-title">
    <div class="section-heading" data-reveal>
      <p class="eyebrow">Strength</p>
      <h2 id="strength-title">核心能力</h2>
    </div>

    <div class="bento-grid">
      <article
        v-for="(strength, index) in strengths"
        :key="strength.title"
        class="bento-card"
        :class="{ 'bento-card-large': index === 0 || index === 3 }"
      >
        <span class="card-index">0{{ index + 1 }}</span>
        <h3>{{ strength.title }}</h3>
        <p>{{ strength.description }}</p>
        <div class="chip-row" aria-label="技術關鍵字">
          <span v-for="keyword in strength.keywords" :key="keyword" class="chip">
            {{ keyword }}
          </span>
        </div>
      </article>
    </div>
  </section>
</template>
