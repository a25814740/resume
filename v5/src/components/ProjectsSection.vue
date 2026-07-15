<script setup lang="ts">
import { computed, ref } from 'vue'
import { gsap } from 'gsap'
import { works, type Work } from '../data/projects'
import WorkDetail from './works/WorkDetail.vue'

const selected = ref<Work | null>(null)
const hoveredId = ref<string | null>(null)
const track = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const openingId = ref<string | null>(null)
const selectedIndex = computed(() => works.findIndex((work) => work.id === selected.value?.id))
let dragStartX = 0
let dragStartScrollLeft = 0
let draggedDistance = 0
let suppressClick = false

function openWork(work: Work, event: globalThis.MouseEvent) {
  // 拖曳結束後瀏覽器仍會補送 click；避免使用者只是橫移卻意外打開作品。
  if (suppressClick || openingId.value) return

  const element = track.value
  const strip = event.currentTarget as HTMLElement | null
  if (!element || !strip || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    selected.value = work
    return
  }

  const trackRect = element.getBoundingClientRect()
  const stripRect = strip.getBoundingClientRect()
  const target = Math.min(
    element.scrollWidth - element.clientWidth,
    Math.max(0, element.scrollLeft + stripRect.left - trackRect.left),
  )
  const finalLeft = stripRect.left - (target - element.scrollLeft)
  const residualOffset = trackRect.left - finalLeft

  openingId.value = work.id
  gsap.timeline({
    onComplete: () => {
      selected.value = work
      openingId.value = null
      // 詳情層接手同一個左側位置後，清掉清單項目的暫時 FLIP 位移。
      window.requestAnimationFrame(() => gsap.set(strip, { clearProps: 'transform,zIndex' }))
    },
  })
    .set(strip, { zIndex: 12 })
    .to(element, { scrollLeft: target, duration: .42, ease: 'power4.inOut' }, 0)
    .to(strip, { x: residualOffset, duration: .42, ease: 'power4.inOut' }, 0)
}

function startDrag(event: globalThis.PointerEvent) {
  const element = track.value
  if (!element || (event.pointerType === 'mouse' && event.button !== 0)) return

  isDragging.value = true
  draggedDistance = 0
  dragStartX = event.clientX
  dragStartScrollLeft = element.scrollLeft
}

function moveDrag(event: globalThis.PointerEvent) {
  const element = track.value
  if (!element || !isDragging.value) return

  const distance = event.clientX - dragStartX
  draggedDistance = Math.max(draggedDistance, Math.abs(distance))
  if (draggedDistance > 6 && !element.hasPointerCapture(event.pointerId)) {
    element.setPointerCapture(event.pointerId)
  }
  element.scrollLeft = dragStartScrollLeft - distance
}

function endDrag(event: globalThis.PointerEvent) {
  const element = track.value
  if (!element || !isDragging.value) return

  isDragging.value = false
  if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId)

  if (draggedDistance > 6) {
    suppressClick = true
    window.setTimeout(() => { suppressClick = false }, 0)
  }
}

function scrollHorizontally(event: globalThis.WheelEvent) {
  const element = track.value
  if (!element || element.scrollWidth <= element.clientWidth) return

  const distance = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
  if (!distance) return

  const atStart = element.scrollLeft <= 0
  const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 1
  const canMove = (distance < 0 && !atStart) || (distance > 0 && !atEnd)

  // 到達左右邊界後把垂直滾輪還給主頁，使用者仍能離開 Project 區。
  if (!canMove) return
  event.preventDefault()
  element.scrollLeft += distance
}
</script>

<template>
  <section id="projects" class="projects-wall" aria-labelledby="projects-title">
    <h2 id="projects-title" class="sr-only">作品賞析</h2>

    <div
      ref="track"
      class="projects-wall__track"
      :class="{ 'has-hover': hoveredId, 'is-dragging': isDragging, 'is-opening': openingId }"
      aria-label="作品清單"
      @mouseleave="hoveredId = null"
      @pointerdown="startDrag"
      @pointermove="moveDrag"
      @pointerup="endDrag"
      @pointercancel="endDrag"
      @wheel="scrollHorizontally"
    >
      <button
        v-for="(work, index) in works"
        :key="work.id"
        type="button"
        class="project-strip"
        :class="{
          'is-active': hoveredId === work.id,
          'is-muted': hoveredId && hoveredId !== work.id,
          'is-opening-target': openingId === work.id,
        }"
        :aria-label="`查看 ${work.title} 作品詳情`"
        @mouseenter="hoveredId = work.id"
        @focus="hoveredId = work.id"
        @blur="hoveredId = null"
        @click="openWork(work, $event)"
      >
        <span class="project-strip__visual project-strip__visual--top" aria-hidden="true">
          <img
            :src="work.coverImage"
            alt=""
            :fetchpriority="index === 0 ? 'high' : 'auto'"
            :loading="index < 3 ? 'eager' : 'lazy'"
            decoding="async"
            draggable="false"
          />
        </span>

        <span class="project-strip__identity">
          <strong>{{ work.title }}</strong>
          <small>{{ work.category }}</small>
          <i aria-hidden="true">VIEW</i>
        </span>

        <span class="project-strip__visual project-strip__visual--bottom" aria-hidden="true">
          <img
            :src="work.coverImage"
            alt=""
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        </span>
      </button>
    </div>

    <p class="projects-wall__hint" aria-hidden="true">HOVER TO EXPLORE · CLICK TO OPEN</p>

    <WorkDetail
      v-if="selected"
      :initial-index="selectedIndex"
      @close="selected = null"
    />
  </section>
</template>
