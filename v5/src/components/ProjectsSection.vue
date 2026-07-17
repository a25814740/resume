<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'
import { works, type Work } from '../data/projects'
import WorkDetail from './works/WorkDetail.vue'

const hoveredId = ref<string | null>(null)
const track = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const openingId = ref<string | null>(null)
const selectedIndex = ref<number | null>(null)
const selected = computed<Work | null>(() => selectedIndex.value === null ? null : works[selectedIndex.value])
const isChangingWork = ref(false)
const desktopCardWidth = 260
const cardShiftDuration = .9
let dragStartX = 0
let dragStartScrollLeft = 0
let draggedDistance = 0
let suppressClick = false
let wheelTween: gsap.core.Tween | null = null

function stopWheelTween() {
  wheelTween?.kill()
  wheelTween = null
}

function getTargetScroll(index: number) {
  const element = track.value
  if (!element) return index * desktopCardWidth
  const firstCard = element.querySelector<HTMLElement>('.project-item')
  const cardWidth = firstCard?.getBoundingClientRect().width || desktopCardWidth
  const maxScroll = element.scrollWidth - element.clientWidth
  return maxScroll > 0 ? Math.min(index * cardWidth, maxScroll) : index * cardWidth
}

function alignSelectedCard(index: number, complete: () => void) {
  const element = track.value
  stopWheelTween()
  if (!element || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    if (element) element.scrollLeft = getTargetScroll(index)
    complete()
    return
  }

  gsap.to(element, {
    scrollLeft: getTargetScroll(index),
    duration: cardShiftDuration,
    ease: 'power3.inOut',
    onComplete: complete,
  })
}

function openWork(work: Work) {
  // 拖曳結束後瀏覽器仍會補送 click；避免使用者只是橫移卻意外打開作品。
  if (suppressClick || openingId.value) return

  const index = works.findIndex((item) => item.id === work.id)
  if (index < 0) return
  openingId.value = work.id
  alignSelectedCard(index, () => {
    selectedIndex.value = index
    hoveredId.value = null
    openingId.value = null
  })
}

function changeWork(direction: -1 | 1) {
  if (selectedIndex.value === null || isChangingWork.value) return
  const nextIndex = selectedIndex.value + direction
  if (nextIndex < 0 || nextIndex >= works.length) return

  isChangingWork.value = true
  hoveredId.value = null
  openingId.value = works[nextIndex].id
  alignSelectedCard(nextIndex, () => {
    selectedIndex.value = nextIndex
    openingId.value = null
  })
}

function startDrag(event: globalThis.PointerEvent) {
  const element = track.value
  if (!element || (event.pointerType === 'mouse' && event.button !== 0)) return

  stopWheelTween()
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
  const maxScroll = element.scrollWidth - element.clientWidth
  const targetScrollLeft = Math.max(0, Math.min(element.scrollLeft + distance, maxScroll))
  stopWheelTween()
  wheelTween = gsap.to(element, {
    scrollLeft: targetScrollLeft,
    duration: .38,
    ease: 'power3.out',
    overwrite: true,
    onComplete: () => { wheelTween = null },
  })
}

onBeforeUnmount(stopWheelTween)
</script>

<template>
  <section id="projects" class="projects-wall" aria-labelledby="projects-title">
    <h2 id="projects-title" class="sr-only">作品賞析</h2>

    <div
      ref="track"
      class="projects-wall__track"
      :class="{
        'has-hover': !selected && hoveredId,
        'is-dragging': isDragging,
        'is-opening': openingId,
        'is-detail-open': selected,
      }"
      aria-label="作品清單"
      @mouseleave="hoveredId = null"
      @pointerdown="startDrag"
      @pointermove="moveDrag"
      @pointerup="endDrag"
      @pointercancel="endDrag"
      @wheel="scrollHorizontally"
    >
      <section
        v-for="work in works"
        :key="work.id"
        class="project-item"
        itemscope
        itemtype="https://schema.org/CreativeWork"
      >
        <h3 class="sr-only" itemprop="name">{{ work.title }}</h3>
        <button
          type="button"
          class="project-strip"
          :class="{
            'is-active': selected ? selected.id === work.id : hoveredId === work.id,
            'is-muted': !selected && hoveredId && hoveredId !== work.id,
          }"
          :style="{ '--project-background': `url(${work.listImage || work.coverImage})` }"
          :aria-label="`查看 ${work.title} 作品詳情`"
          @mouseenter="hoveredId = work.id"
          @focus="hoveredId = work.id"
          @blur="hoveredId = null"
          @click="openWork(work)"
        >
          <span class="project-strip__identity">
            <strong itemprop="name">{{ work.title }}</strong>
            <small itemprop="genre">{{ work.category }}</small>
            <i aria-hidden="true">VIEW</i>
          </span>
          <span class="project-strip__overlay" aria-hidden="true"></span>
        </button>
      </section>
      <div class="projects-wall__end-space" aria-hidden="true"></div>
    </div>

    <p class="projects-wall__hint" aria-hidden="true">HOVER TO EXPLORE · CLICK TO OPEN</p>

    <WorkDetail
      v-if="selected"
      :work="selected"
      :index="selectedIndex ?? 0"
      :total="works.length"
      :transitioning="isChangingWork"
      @close="selectedIndex = null"
      @previous="changeWork(-1)"
      @next="changeWork(1)"
      @revealed="isChangingWork = false"
    />
  </section>
</template>
