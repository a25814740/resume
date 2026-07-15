<script setup lang="ts">
defineProps<{ visible: boolean }>()
</script>

<template>
  <Transition name="work-loader">
    <div v-if="visible" class="work-loader" aria-live="polite" aria-label="作品內容載入中">
      <span>EDEN / SELECTED WORK</span>
      <div class="work-loader__line"><i></i></div>
    </div>
  </Transition>
</template>
