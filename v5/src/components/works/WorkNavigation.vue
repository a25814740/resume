<script setup lang="ts">
defineProps<{ disabled: boolean }>()
defineEmits<{ previous: []; next: [] }>()
</script>

<template>
  <nav class="work-navigation" aria-label="切換作品">
    <button type="button" :disabled="disabled" @click="$emit('previous')"><span aria-hidden="true">←</span> Prev</button>
    <a class="work-navigation__contact" href="mailto:a25814740@gmail.com">有合作想法？聯絡 Eden</a>
    <button type="button" :disabled="disabled" @click="$emit('next')">Next <span aria-hidden="true">→</span></button>
  </nav>
</template>
