<script setup>
import { navItems } from '../data/resume';
</script>

<template>
  <header class="app-header">
    <a class="brand-link" href="#top" aria-label="回到頁首">
      <span class="brand-dot" aria-hidden="true"></span>
      <span>羅仕林</span>
    </a>

    <nav class="site-nav" aria-label="主要導覽">
      <a v-for="item in navItems" :key="item.href" :href="item.href">
        {{ item.label }}
      </a>
    </nav>
  </header>
</template>
