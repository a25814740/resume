<script setup>
import { GraduationCap, MapPin, UserRound } from '@lucide/vue';
import { profile } from '../data/resume';
</script>

<template>
  <section id="about" class="section about-section" aria-labelledby="about-title">
    <div class="section-heading" data-reveal>
      <p class="eyebrow">About</p>
      <h2 id="about-title">關於我</h2>
    </div>

    <div class="about-layout">
      <div class="about-copy" data-reveal>
        <p>{{ profile.about }}</p>
        <div class="about-meta" aria-label="基本資料">
          <span>
            <GraduationCap :size="18" aria-hidden="true" />
            {{ profile.education }}
          </span>
          <span>
            <MapPin :size="18" aria-hidden="true" />
            {{ profile.location }}
          </span>
        </div>
      </div>

      <div class="about-summary" aria-label="履歷摘要">
        <article data-reveal>
          <UserRound :size="20" aria-hidden="true" />
          <h3>{{ profile.title }}</h3>
          <p>{{ profile.experience }}</p>
        </article>
        <article v-for="point in profile.summaryPoints" :key="point" data-reveal>
          <p>{{ point }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
