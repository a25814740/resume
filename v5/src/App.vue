<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import Navbar from './components/Navbar.vue'
import HomeSection from './components/HomeSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'

const scrollContainer = ref(null)
const sectionIds = ['home', 'about', 'skills', 'experience', 'projects']
const requestedInitialHash = sectionIds.includes(window.location.hash.slice(1)) ? window.location.hash : '#home'
let navigationTarget = null
let navigationTargetTop = null
let scrollEndTimer = null

// 避免瀏覽器在 Vue 掛載錨點時瞬間跳轉；掛載完成後改由主容器平滑捲動。
if (window.location.hash) {
  window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}`)
}

function sectionTop(section) {
  const container = scrollContainer.value
  if (!container) return 0
  return container.scrollTop + section.getBoundingClientRect().top - container.getBoundingClientRect().top
}

function scrollToSection(hash, options = {}) {
  const container = scrollContainer.value
  const id = hash.replace(/^#/, '')
  const section = document.getElementById(id)
  if (!container || !section || !sectionIds.includes(id)) return

  const { updateHistory = true } = options
  navigationTarget = id
  navigationTargetTop = sectionTop(section)
  if (updateHistory && window.location.hash !== `#${id}`) {
    window.history.pushState(null, '', `#${id}`)
  }
  container.style.scrollSnapType = 'none'
  container.scrollTo({ top: navigationTargetTop, behavior: 'smooth' })
  if (scrollEndTimer) window.clearTimeout(scrollEndTimer)
  scrollEndTimer = window.setTimeout(() => {
    if (navigationTargetTop !== null) container.scrollTop = navigationTargetTop
    container.style.removeProperty('scroll-snap-type')
    navigationTarget = null
    navigationTargetTop = null
    syncHashToScroll()
  }, 1200)
}

function syncHashToScroll() {
  const container = scrollContainer.value
  if (!container) return
  const marker = container.scrollTop + container.clientHeight * .45
  let currentId = sectionIds[0]

  for (const id of sectionIds) {
    const section = document.getElementById(id)
    if (section && sectionTop(section) <= marker) currentId = id
  }

  if (window.location.hash !== `#${currentId}`) {
    window.history.replaceState(null, '', `#${currentId}`)
  }
}

function handleMainScroll() {
  if (scrollEndTimer) window.clearTimeout(scrollEndTimer)
  if (!navigationTarget) syncHashToScroll()
  scrollEndTimer = window.setTimeout(() => {
    const container = scrollContainer.value
    if (container && navigationTargetTop !== null) container.scrollTop = navigationTargetTop
    container?.style.removeProperty('scroll-snap-type')
    navigationTarget = null
    navigationTargetTop = null
    syncHashToScroll()
  }, 160)
}

function handleHistoryNavigation() {
  const hash = window.location.hash || '#home'
  scrollToSection(hash, { updateHistory: false })
}

onMounted(async () => {
  window.history.scrollRestoration = 'manual'
  window.addEventListener('popstate', handleHistoryNavigation)
  await nextTick()

  if (scrollContainer.value) scrollContainer.value.scrollTop = 0
  window.history.replaceState(window.history.state, '', requestedInitialHash)
  window.requestAnimationFrame(() => scrollToSection(requestedInitialHash, { updateHistory: false }))
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', handleHistoryNavigation)
  if (scrollEndTimer) window.clearTimeout(scrollEndTimer)
})
</script>

<template>
  <div class="bg-[#020617] h-screen w-screen overflow-hidden">
    <Navbar @navigate="scrollToSection" />

    <!-- Fullpage Scroll Container -->
    <main ref="scrollContainer" data-scroll-container class="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth hide-scrollbar" @scroll.passive="handleMainScroll">
      <div class="snap-start h-screen w-full relative">
        <HomeSection />
      </div>
      <div class="snap-start h-screen w-full relative">
        <AboutSection />
      </div>
      <div class="snap-start min-h-screen h-auto w-full relative">
        <SkillsSection />
      </div>
      <div class="snap-start h-screen w-full relative">
        <ExperienceSection />
      </div>
      <div class="snap-start h-screen w-full relative">
        <ProjectsSection />
      </div>
      <div class="snap-start w-full relative">
        <!-- Footer -->
        <footer class="py-12 bg-[#020617] border-t border-[#334155] text-center">
          <p class="font-mono text-[#c084fc] text-lg font-bold mb-2">
            <span class="text-[#a78bfa]">&lt;</span>Eden<span class="text-[#a78bfa]">/&gt;</span>
          </p>
          <p class="text-[#94a3b8] text-sm font-mono">
            &copy; {{ new Date().getFullYear() }} 羅仕林 Eden Lo · AI Application Engineer
          </p>
          <p class="text-[#334155] text-xs mt-2 font-mono">Built with Vue 3 + CSS Scroll Snap + Tailwind CSS</p>
        </footer>
      </div>
    </main>
  </div>
</template>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* Prevent body scroll, let main handle it */
}
</style>
