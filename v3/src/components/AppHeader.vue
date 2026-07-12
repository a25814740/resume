<script setup lang="ts">
import { navItems, profile } from '../data/resume';
</script>

<template>
  <header class="site-header">
    <a class="brand-mark" href="#top" aria-label="回到頁首">
      <span>{{ profile.name }}</span>
      <small>{{ profile.englishName }}</small>
    </a>

    <nav class="site-nav" aria-label="主要導覽">
      <a v-for="item in navItems" :key="item.href" :href="item.href">
        {{ item.label }}
      </a>
    </nav>
  </header>
</template>
