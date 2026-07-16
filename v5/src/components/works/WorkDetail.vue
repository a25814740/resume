<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import type { Work } from '../../data/projects'
import WorkGallery from './WorkGallery.vue'

const props = defineProps<{ work: Work; index: number; total: number; transitioning: boolean }>()
const emit = defineEmits<{ close: []; previous: []; next: [] }>()
const root = ref<HTMLElement | null>(null)
const closeButton = ref<globalThis.HTMLButtonElement | null>(null)
let scrollContainer: HTMLElement | null = null
let previousOverflow = ''

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const themeStyle = () => ({
  '--work-background': props.work.theme.background,
  '--work-surface': props.work.theme.surface,
  '--work-text': props.work.theme.text,
  '--work-muted': props.work.theme.mutedText,
  '--work-accent': props.work.theme.accent,
  '--work-overlay': props.work.theme.overlay,
})

async function close() {
  const scope = root.value
  if (!scope || reducedMotion()) {
    emit('close')
    return
  }

  await new Promise<void>((resolve) => {
    gsap.timeline({ onComplete: resolve })
      .to(scope.querySelector('.work-gallery'), {
        xPercent: 105,
        duration: .42,
        ease: 'power4.inOut',
      })
      .to(scope.querySelector('.work-detail__info'), {
        xPercent: 105,
        duration: .42,
        ease: 'power4.inOut',
      }, '-=.22')
      .to(scope, { autoAlpha: 0, duration: .18 }, '-=.08')
  })
  emit('close')
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft' && props.index > 0 && !props.transitioning) emit('previous')
  if (event.key === 'ArrowRight' && props.index < props.total - 1 && !props.transitioning) emit('next')
  if (event.key === 'Escape') close()
}

async function revealDetail() {
  const scope = root.value
  if (!scope || reducedMotion()) {
    closeButton.value?.focus({ preventScroll: true })
    return
  }

  const info = scope.querySelector('.work-detail__info')
  const copy = scope.querySelectorAll('[data-copy-reveal]')
  const gallery = scope.querySelector('.work-gallery')

  gsap.set(info, { xPercent: -105 })
  gsap.set(copy, { x: -34, autoAlpha: 0 })
  gsap.set(gallery, { xPercent: -105 })

  await new Promise<void>((resolve) => {
    gsap.timeline({ defaults: { ease: 'power4.out' }, onComplete: resolve })
      .to(info, { xPercent: 0, duration: .68 }, .08)
      .to(copy, { x: 0, autoAlpha: 1, duration: .52, stagger: .055 }, .38)
      .to(gallery, { xPercent: 0, duration: .78 }, .68)
  })

  closeButton.value?.focus({ preventScroll: true })
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  scrollContainer = document.querySelector('[data-scroll-container]')
  if (scrollContainer) {
    previousOverflow = scrollContainer.style.overflowY
    scrollContainer.style.overflowY = 'hidden'
  }

  revealDetail()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  if (scrollContainer) scrollContainer.style.overflowY = previousOverflow
  if (root.value) gsap.killTweensOf(root.value.querySelectorAll('*'))
})
</script>

<template>
  <section
    ref="root"
    class="work-detail"
    :style="themeStyle()"
    role="dialog"
    aria-modal="true"
    aria-label="作品詳情"
  >
    <article class="work-detail__info" data-work-change>
      <button ref="closeButton" class="work-detail__close" type="button" aria-label="關閉作品詳情" @click="close">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>

      <div class="work-detail__copy">
        <p data-copy-reveal>OUR WORK <i>/</i> <span>{{ work.category }}</span></p>
        <h2 data-copy-reveal>{{ work.title }}</h2>
        <div class="work-detail__rule" data-copy-reveal></div>
        <p class="work-detail__description" data-copy-reveal>{{ work.description }}</p>
        <ul aria-label="使用技術" data-copy-reveal>
          <li v-for="tech in work.tech" :key="tech">{{ tech }}</li>
        </ul>
        <a :href="work.link" target="_blank" rel="noopener noreferrer" data-copy-reveal>
          開啟網站 <span aria-hidden="true">↗</span>
        </a>
      </div>

      <button
        v-if="index > 0"
        class="work-detail__switch work-detail__switch--previous"
        type="button"
        :disabled="transitioning"
        aria-label="上一個作品"
        @click="$emit('previous')"
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        v-if="index < total - 1"
        class="work-detail__switch work-detail__switch--next"
        type="button"
        :disabled="transitioning"
        aria-label="下一個作品"
        @click="$emit('next')"
      >
        <span aria-hidden="true">›</span>
      </button>

      <span class="work-detail__counter">
        {{ String(index + 1).padStart(2, '0') }} / {{ String(total).padStart(2, '0') }}
      </span>
    </article>

    <WorkGallery :key="work.id" :work="work" :intro-delay="980" />
  </section>
</template>
