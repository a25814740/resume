<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { works } from '../../data/projects'
import { useWorkCarousel } from '../../composables/useWorkCarousel'
import WorkGallery from './WorkGallery.vue'

const props = defineProps<{ initialIndex: number }>()
const emit = defineEmits<{ close: [] }>()
const root = ref<HTMLElement | null>(null)
const closeButton = ref<globalThis.HTMLButtonElement | null>(null)
const { activeIndex, activeWork, isTransitioning, move } = useWorkCarousel(works, props.initialIndex)
let scrollContainer: HTMLElement | null = null
let previousOverflow = ''

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const themeStyle = () => ({
  '--work-background': activeWork.value.theme.background,
  '--work-surface': activeWork.value.theme.surface,
  '--work-text': activeWork.value.theme.text,
  '--work-muted': activeWork.value.theme.mutedText,
  '--work-accent': activeWork.value.theme.accent,
  '--work-overlay': activeWork.value.theme.overlay,
})

async function animate(direction: -1 | 1, commit: () => void) {
  const scope = root.value
  if (!scope || reducedMotion()) {
    commit()
    await nextTick()
    return
  }

  const outgoing = scope.querySelectorAll('[data-work-change]')
  await new Promise<void>((resolve) => {
    gsap.timeline({ onComplete: resolve })
      .to(outgoing, {
        xPercent: direction * -8,
        autoAlpha: 0,
        duration: .28,
        stagger: .025,
        ease: 'power3.in',
      })
      .to(scope.querySelector('.work-detail__wipe'), {
        scaleX: 1,
        transformOrigin: direction === 1 ? 'right' : 'left',
        duration: .34,
        ease: 'power4.inOut',
      }, '<')
  })

  commit()
  await nextTick()
  const incoming = scope.querySelectorAll('[data-work-change]')
  gsap.set(incoming, { xPercent: direction * 8, autoAlpha: 0 })
  await new Promise<void>((resolve) => {
    gsap.timeline({ onComplete: resolve })
      .to(scope.querySelector('.work-detail__wipe'), {
        scaleX: 0,
        transformOrigin: direction === 1 ? 'left' : 'right',
        duration: .4,
        ease: 'power4.inOut',
      })
      .to(incoming, {
        xPercent: 0,
        autoAlpha: 1,
        duration: .5,
        stagger: .04,
        ease: 'power4.out',
      }, '-=.18')
  })
}

const change = (direction: -1 | 1) => move(direction, animate)

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
  if (event.key === 'ArrowLeft') change(-1)
  if (event.key === 'ArrowRight') change(1)
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
      .fromTo(scope.querySelector('.work-detail__cover'),
        { filter: 'brightness(.72)' },
        { filter: 'brightness(1)', duration: .45 },
      )
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
    <div class="work-detail__wipe" aria-hidden="true"></div>

    <aside class="work-detail__cover" data-work-change>
      <img :src="activeWork.coverImage" :alt="`${activeWork.title} 作品封面`" />
      <div class="work-detail__cover-label">
        <strong>{{ activeWork.title }}</strong>
        <span>{{ activeWork.category }}</span>
      </div>
    </aside>

    <article class="work-detail__info" data-work-change>
      <button ref="closeButton" class="work-detail__close" type="button" aria-label="關閉作品詳情" @click="close">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>

      <div class="work-detail__copy">
        <p data-copy-reveal>OUR WORK <i>/</i> <span>{{ activeWork.category }}</span></p>
        <h2 data-copy-reveal>{{ activeWork.title }}</h2>
        <div class="work-detail__rule" data-copy-reveal></div>
        <p class="work-detail__description" data-copy-reveal>{{ activeWork.description }}</p>
        <ul aria-label="使用技術" data-copy-reveal>
          <li v-for="tech in activeWork.tech" :key="tech">{{ tech }}</li>
        </ul>
        <a :href="activeWork.link" target="_blank" rel="noopener noreferrer" data-copy-reveal>
          開啟網站 <span aria-hidden="true">↗</span>
        </a>
      </div>

      <button
        class="work-detail__switch work-detail__switch--previous"
        type="button"
        :disabled="isTransitioning"
        aria-label="上一個作品"
        @click="change(-1)"
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        class="work-detail__switch work-detail__switch--next"
        type="button"
        :disabled="isTransitioning"
        aria-label="下一個作品"
        @click="change(1)"
      >
        <span aria-hidden="true">›</span>
      </button>

      <span class="work-detail__counter">
        {{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(works.length).padStart(2, '0') }}
      </span>
    </article>

    <WorkGallery :key="activeWork.id" :work="activeWork" :intro-delay="980" />
  </section>
</template>
