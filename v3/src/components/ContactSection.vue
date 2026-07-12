<script setup lang="ts">
import { profile } from '../data/resume';
</script>

<template>
  <footer id="contact" class="contact-section section-shell" data-reveal>
    <div class="section-heading">
      <p class="section-kicker">聯絡我</p>
      <h2>希望職稱：AI 應用開發專員 / AI 應用工程師 / 前端工程師</h2>
    </div>

    <address class="contact-grid">
      <a :href="`mailto:${profile.email}`">
        <span>Email</span>
        {{ profile.email }}
      </a>
      <a :href="`tel:${profile.phone.replaceAll('-', '')}`">
        <span>Phone</span>
        {{ profile.phone }}
      </a>
      <p>
        <span>Location</span>
        {{ profile.location }}
      </p>
    </address>

    <a class="button button-primary contact-cta" :href="`mailto:${profile.email}`">
      寄信聯絡
    </a>
  </footer>
</template>
