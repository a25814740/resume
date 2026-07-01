<script setup>
import { GraduationCap, MapPin } from '@lucide/vue';
import { designResearch, profile } from '../data/resume';
</script>

<template>
  <section id="about" class="section about-section" aria-labelledby="about-title">
    <div class="section-heading" data-reveal>
      <p class="eyebrow">About</p>
      <h2 id="about-title">前端實戰是底，AI 工作流是現在正在補上的加速器。</h2>
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

      <div class="research-grid" aria-label="設計研究摘要">
        <article v-for="item in designResearch" :key="item.title" data-reveal>
          <h3>{{ item.title }}</h3>
          <p>{{ item.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
