<script setup lang="ts">
import { profile } from '../data/resume';
</script>

<template>
  <section id="top" class="hero-section section-shell">
    <div class="hero-copy">
      <p class="role-line">{{ profile.title }}</p>
      <h1>
        {{ profile.name }}
        <span>{{ profile.englishName }}</span>
      </h1>
      <p class="hero-headline">{{ profile.headline }}</p>
      <p class="hero-summary">{{ profile.summary }}</p>

      <div class="hero-actions" aria-label="履歷快速操作">
        <a class="button button-primary" href="#strengths">查看能力亮點</a>
        <a class="button button-quiet" href="#projects">查看作品集</a>
        <a class="button button-link" :href="`mailto:${profile.email}`">聯絡我</a>
      </div>
    </div>

    <aside class="hero-panel" aria-label="履歷摘要">
      <div class="profile-frame">
        <img
          src="/assets/eden-profile.jpg"
          width="960"
          height="1200"
          fetchpriority="high"
          decoding="async"
          alt="羅仕林 Eden 個人照片"
        />
      </div>
      <div class="signal-list">
        <div v-for="fact in profile.facts" :key="fact" class="signal-row">
          <span aria-hidden="true"></span>
          <p>{{ fact }}</p>
        </div>
      </div>
    </aside>
  </section>
</template>
