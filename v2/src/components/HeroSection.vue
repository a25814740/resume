<script setup>
import { ArrowDown, BriefcaseBusiness, Mail } from '@lucide/vue';
import { profile } from '../data/resume';
</script>

<template>
  <section id="top" class="hero-section" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="eyebrow reveal-up">互動式履歷 / AI Application Resume</p>
      <h1 id="hero-title" class="hero-title">
        <span class="reveal-up">{{ profile.name }}</span>
        <span class="reveal-up delay-1">{{ profile.headline }}</span>
      </h1>
      <p class="hero-lead reveal-up delay-2">{{ profile.heroLead }}</p>
      <p class="hero-body reveal-up delay-3">{{ profile.heroBody }}</p>

      <div class="hero-actions reveal-up delay-4">
        <a class="button button-primary" href="#strengths">
          <BriefcaseBusiness :size="18" aria-hidden="true" />
          查看能力亮點
        </a>
        <a class="button button-secondary" href="#projects">
          <ArrowDown :size="18" aria-hidden="true" />
          查看作品集
        </a>
        <a class="button button-ghost" :href="`mailto:${profile.email}`">
          <Mail :size="18" aria-hidden="true" />
          聯絡我
        </a>
      </div>
    </div>

    <aside class="hero-panel reveal-up delay-2" aria-label="履歷摘要">
      <div class="signal-card hero-signal">
        <span>Experience</span>
        <strong>{{ profile.experience }}</strong>
        <p>Vue3 / JavaScript / RWD / API 串接 / 後台管理系統</p>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="signal-list">
        <span v-for="role in profile.roles" :key="role">{{ role }}</span>
      </div>
    </aside>
  </section>
</template>
