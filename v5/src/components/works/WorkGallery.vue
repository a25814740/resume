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
const revealedImageCount = ref(0)
const isAtEnd = ref(false)
const sliceCount = 8
let hideTimer: number | undefined
let introTimer: number | undefined
const imageRevealTimers: number[] = []

const galleryScreenshots = computed(() => props.work.galleryImages.length ? props.work.galleryImages : [props.work.coverImage])
const screenshot = computed(() => galleryScreenshots.value[0])

function settleSlices(delay = 0) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      slicesSettled.value = true
      if (hideTimer) window.clearTimeout(hideTimer)
      hideTimer = window.setTimeout(() => {
        showSlices.value = false
        entryMode.value = false
        revealGalleryImages()
      }, delay || 780)
    })
  })
}

function revealGalleryImages() {
  // 第一張由切片遮罩揭露；後續長圖才依序淡入，避免同時出現造成畫面跳動。
  revealedImageCount.value = Math.min(1, galleryScreenshots.value.length)

  galleryScreenshots.value.slice(1).forEach((_, index) => {
    const timer = window.setTimeout(() => {
      revealedImageCount.value = index + 2
    }, 320 * (index + 1))
    imageRevealTimers.push(timer)
  })
}

function handleScroll(event: Event) {
  const element = event.currentTarget as HTMLElement
  const range = element.scrollHeight - element.clientHeight
  // 右側截圖只在展開時播放一次切片揭露；捲動期間維持原尺寸，避免遮罩反覆重播造成跳動。
  isAtEnd.value = range > 0 && element.scrollTop >= range - 8
}

function sliceStyle(index: number) {
  return {
    '--slice-index': index,
    '--slice-direction': index % 2 === 0 ? -1 : 1,
    backgroundImage: `url("${screenshot.value}")`,
    backgroundSize: `${sliceCount * 100}% auto`,
    backgroundPosition: `${(index / (sliceCount - 1)) * 100}% top`,
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
  imageRevealTimers.forEach((timer) => window.clearTimeout(timer))
})
</script>

<template>
  <section
    ref="gallery"
    class="work-gallery"
    :class="{ 'is-intro': entryMode, 'is-blairsfilm': work.id === 'blairsfilm', 'is-at-end': isAtEnd }"
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

    <figure
      v-for="(image, index) in galleryScreenshots"
      :key="image"
      class="work-gallery__canvas"
      :class="{ 'is-revealed': index < revealedImageCount }"
      data-work-media
    >
      <img
        :src="image"
        :alt="`${work.title} 網站截圖 ${index + 1}`"
        :fetchpriority="index === 0 ? 'high' : 'auto'"
        decoding="async"
        @error="handleImageError"
      />
      <figcaption>FULL HOMEPAGE CAPTURE {{ galleryScreenshots.length > 1 ? `${index + 1} / ${galleryScreenshots.length}` : '' }}</figcaption>
    </figure>
    <!-- 只有多張截圖需要銜接時才保留收尾效果，單張長圖不額外留空白。 -->
    <div v-if="galleryScreenshots.length > 1" class="work-gallery__end-cap" aria-hidden="true"></div>
  </section>
</template>
