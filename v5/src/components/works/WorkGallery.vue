<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Work } from '../../data/projects'

const props = withDefaults(defineProps<{ work: Work; introDelay?: number }>(), {
  introDelay: 0,
})
const gallery = ref<HTMLElement | null>(null)
const showSlices = ref(true)
const slicesSettled = ref(false)
const entryMode = ref(true)
const scrollProgress = ref(0)
const sliceCount = 8
let hideTimer: number | undefined
let introTimer: number | undefined

const screenshot = computed(() => props.work.galleryImages[0] || props.work.coverImage)

function settleSlices(delay = 0) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      slicesSettled.value = true
      if (hideTimer) window.clearTimeout(hideTimer)
      hideTimer = window.setTimeout(() => {
        showSlices.value = false
        entryMode.value = false
      }, delay || 780)
    })
  })
}

function handleScroll(event: Event) {
  const element = event.currentTarget as HTMLElement
  const range = element.scrollHeight - element.clientHeight
  scrollProgress.value = range > 0 ? element.scrollTop / range : 0
  entryMode.value = false
  showSlices.value = true
  slicesSettled.value = false
  settleSlices(180)
}

function sliceStyle(index: number) {
  return {
    '--slice-index': index,
    '--slice-direction': index % 2 === 0 ? -1 : 1,
    backgroundImage: `url("${screenshot.value}")`,
    backgroundSize: `${sliceCount * 100}% auto`,
    backgroundPosition: `${(index / (sliceCount - 1)) * 100}% ${scrollProgress.value * 100}%`,
  }
}

function handleImageError(event: Event) {
  ;(event.currentTarget as HTMLImageElement).closest('.work-gallery__canvas')?.classList.add('is-unavailable')
}

onMounted(() => {
  introTimer = window.setTimeout(() => settleSlices(), props.introDelay)
})
onBeforeUnmount(() => {
  if (hideTimer) window.clearTimeout(hideTimer)
  if (introTimer) window.clearTimeout(introTimer)
})
</script>

<template>
  <section
    ref="gallery"
    class="work-gallery"
    :class="{ 'is-intro': entryMode }"
    aria-label="作品首頁完整截圖，可獨立捲動"
    data-work-change
    @scroll.passive="handleScroll"
  >
    <div
      class="work-gallery__split-overlay"
      :class="{
        'is-visible': showSlices,
        'is-settled': slicesSettled,
        'is-entering': entryMode,
      }"
      aria-hidden="true"
    >
      <i v-for="index in sliceCount" :key="index" :style="sliceStyle(index - 1)"></i>
    </div>

    <figure class="work-gallery__canvas" data-work-media>
      <img
        :src="screenshot"
        :alt="`${work.title} 網站首頁完整截圖`"
        fetchpriority="high"
        decoding="async"
        @error="handleImageError"
      />
      <figcaption>FULL HOMEPAGE CAPTURE</figcaption>
    </figure>
  </section>
</template>
