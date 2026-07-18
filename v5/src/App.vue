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
const workRequestEvent = 'portfolio:work-request'

function sectionIdFromHash(hash) {
  const id = hash.replace(/^#/, '').split(/[/?]/)[0]
  return sectionIds.includes(id) ? id : null
}

function projectSlugFromLocation() {
  const search = new window.URLSearchParams(window.location.search)
  const querySlug = search.get('project') || search.get('work')
  if (querySlug) return querySlug

  const pathMatch = window.location.hash.match(/^#projects\/([^?]+)/)
  if (pathMatch) return decodeURIComponent(pathMatch[1])

  const hashQuery = window.location.hash.split('?')[1]
  if (!hashQuery) return null
  const parameters = new window.URLSearchParams(hashQuery)
  return parameters.get('project') || parameters.get('work')
}

function projectHash(slug) {
  return `#projects/${encodeURIComponent(slug)}`
}

const requestedInitialProject = projectSlugFromLocation()
const requestedInitialHash = requestedInitialProject
  ? '#projects'
  : (sectionIdFromHash(window.location.hash) ? `#${sectionIdFromHash(window.location.hash)}` : '#home')
let navigationTarget = null
let navigationTargetTop = null
let scrollEndTimer = null
let navigationComplete = null

// 避免瀏覽器在 Vue 掛載錨點時瞬間跳轉；掛載完成後改由主容器平滑捲動。
if (window.location.hash) {
  window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}`)
}

function sectionTop(section) {
  const container = scrollContainer.value
  if (!container) return 0
  return container.scrollTop + section.getBoundingClientRect().top - container.getBoundingClientRect().top
}

function finishNavigation() {
  const container = scrollContainer.value
  if (container && navigationTargetTop !== null) container.scrollTop = navigationTargetTop
  container?.style.removeProperty('scroll-snap-type')

  const complete = navigationComplete
  navigationComplete = null
  navigationTarget = null
  navigationTargetTop = null
  syncHashToScroll()
  complete?.()
}

function requestProject(workSlug) {
  window.dispatchEvent(new window.CustomEvent(workRequestEvent, {
    detail: { slug: workSlug, history: 'none' },
  }))
}

function scrollToSection(hash, options = {}) {
  const container = scrollContainer.value
  const id = sectionIdFromHash(hash)
  const section = id ? document.getElementById(id) : null
  if (!container || !section || !id) return

  const { updateHistory = true, onComplete = null } = options
  navigationTarget = id
  navigationTargetTop = sectionTop(section)
  if (updateHistory && window.location.hash !== `#${id}`) {
    window.history.pushState(null, '', `#${id}`)
  }
  container.style.scrollSnapType = 'none'
  container.scrollTo({ top: navigationTargetTop, behavior: 'smooth' })
  navigationComplete = onComplete
  if (scrollEndTimer) window.clearTimeout(scrollEndTimer)
  scrollEndTimer = window.setTimeout(() => {
    finishNavigation()
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

  // #projects/作品名稱 是可分享的深連結；停留在 Projects 時不應被捲動同步機制覆蓋掉。
  if (sectionIdFromHash(window.location.hash) !== currentId) {
    window.history.replaceState(null, '', `#${currentId}`)
  }
}

function handleMainScroll() {
  if (scrollEndTimer) window.clearTimeout(scrollEndTimer)
  if (!navigationTarget) syncHashToScroll()
  scrollEndTimer = window.setTimeout(() => {
    finishNavigation()
  }, 160)
}

function handleHistoryNavigation() {
  const slug = projectSlugFromLocation()
  const hash = slug ? '#projects' : (window.location.hash || '#home')
  scrollToSection(hash, {
    updateHistory: false,
    onComplete: () => requestProject(slug),
  })
}

onMounted(async () => {
  window.history.scrollRestoration = 'manual'
  window.addEventListener('popstate', handleHistoryNavigation)
  await nextTick()

  if (scrollContainer.value) scrollContainer.value.scrollTop = 0
  const initialHash = requestedInitialProject ? projectHash(requestedInitialProject) : requestedInitialHash
  window.history.replaceState(window.history.state, '', initialHash)
  window.requestAnimationFrame(() => {
    scrollToSection(requestedInitialHash, {
      updateHistory: false,
      onComplete: () => requestProject(requestedInitialProject),
    })
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', handleHistoryNavigation)
  if (scrollEndTimer) window.clearTimeout(scrollEndTimer)
})
</script>

<template>
  <div class="app-shell bg-[#020617] h-screen w-screen overflow-hidden">
    <Navbar @navigate="scrollToSection" />

    <!-- Fullpage Scroll Container -->
    <main ref="scrollContainer" data-scroll-container class="site-scroll h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth hide-scrollbar" @scroll.passive="handleMainScroll">
      <div class="section-frame section-frame--home snap-start h-screen w-full relative">
        <HomeSection />
      </div>
      <div class="section-frame section-frame--about snap-start h-screen w-full relative">
        <AboutSection />
      </div>
      <div class="section-frame section-frame--skills snap-start min-h-screen h-auto w-full relative">
        <SkillsSection />
      </div>
      <div class="section-frame section-frame--experience snap-start h-screen w-full relative">
        <ExperienceSection />
      </div>
      <div class="section-frame section-frame--projects snap-start h-screen w-full relative">
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

.app-shell,
.site-scroll { height: 100dvh; }

@media (max-width: 767px) {
  .site-scroll {
    scroll-snap-type: y proximity !important;
    scroll-padding-top: 4.5rem;
  }

  .section-frame {
    height: auto !important;
    min-height: 0;
    scroll-snap-align: start;
  }

  .section-frame--home,
  .section-frame--about,
  .section-frame--projects { min-height: 100svh; }
}

@media (min-width: 768px) and (max-width: 900px) and (max-height: 600px) {
  .site-scroll { scroll-snap-type: y proximity !important; }
  .section-frame { height: auto !important; min-height: 0; }
  .section-frame--home,
  .section-frame--about,
  .section-frame--projects { min-height: 44rem; }
}
</style>
