<script setup lang="ts">
defineProps<{ title: string; index: number; total: number }>()
defineEmits<{ close: [] }>()
</script>

<template>
  <header class="work-header">
    <p>EDEN LO <span>/</span> SELECTED WORK</p>
    <span class="work-header__counter">{{ String(index + 1).padStart(2, '0') }} — {{ String(total).padStart(2, '0') }}</span>
    <button type="button" aria-label="關閉作品詳情" @click="$emit('close')">Close <span>×</span></button>
  </header>
</template>
