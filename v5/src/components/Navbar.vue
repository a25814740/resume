<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['navigate'])

const isScrolled = ref(false)
const isMobileOpen = ref(false)

let scrollContainer
const handleScroll = () => { isScrolled.value = (scrollContainer?.scrollTop ?? 0) > 50 }
onMounted(() => {
  scrollContainer = document.querySelector('[data-scroll-container]')
  scrollContainer?.addEventListener('scroll', handleScroll, { passive: true })
})
onUnmounted(() => scrollContainer?.removeEventListener('scroll', handleScroll))

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
]

function scrollTo(href) {
  isMobileOpen.value = false
  emit('navigate', href)
}
</script>

<template>
  <header
    class="site-header"
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      isScrolled
        ? 'py-3 backdrop-blur-xl border-b border-[#334155]'
        : 'py-5 bg-transparent'
    ]"
    :style="isScrolled ? 'background: rgba(10,14,39,0.95)' : ''"
  >
    <div class="site-header__inner max-w-7xl mx-auto px-6 flex items-center justify-between">
      <!-- Brand -->
      <a href="#home" class="font-mono text-xl font-bold" @click.prevent="scrollTo('#home')">
        <span class="text-[#a78bfa]">&lt;</span>
        <span class="gradient-text">Eden</span>
        <span class="text-[#c084fc]">/</span>
        <span class="text-[#a78bfa]">&gt;</span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8">
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          @click.prevent="scrollTo(link.href)"
          class="font-mono text-sm text-[#94a3b8] hover:text-white transition-colors duration-200 relative group"
        >
          {{ link.label }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 gradient-bg rounded transition-all duration-300 group-hover:w-full"></span>
        </a>
      </nav>

      <!-- Mobile Burger -->
      <button
        class="site-header__toggle md:hidden text-[#94a3b8] hover:text-white"
        type="button"
        :aria-label="isMobileOpen ? '關閉網站選單' : '開啟網站選單'"
        aria-controls="mobile-navigation"
        :aria-expanded="isMobileOpen"
        @click="isMobileOpen = !isMobileOpen"
      >
        <svg v-if="!isMobileOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <!-- Mobile Nav -->
    <transition name="slide-down">
      <div v-if="isMobileOpen" id="mobile-navigation" class="site-header__mobile md:hidden glass border-t border-[#334155] px-6 py-4">
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          @click.prevent="scrollTo(link.href)"
          class="block py-3 font-mono text-sm text-[#cbd5e1] border-b border-[#334155] last:border-0"
        >
          {{ link.label }}
        </a>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.3s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-10px); }

.site-header__toggle {
  width: 44px;
  height: 44px;
  border-radius: .75rem;
  touch-action: manipulation;
}

.site-header__inner > a { display: flex; align-items: center; min-height: 44px; }
.site-header nav a { display: flex; align-items: center; min-height: 44px; }

@media (max-width: 767px) {
  .site-header__toggle { display: grid; place-items: center; }
  .site-header { padding-block: max(.55rem, env(safe-area-inset-top)) .55rem !important; }
  .site-header__inner { padding-inline: 1rem; }
  .site-header__mobile { max-height: calc(100dvh - 4.5rem); padding: .5rem 1rem max(1rem, env(safe-area-inset-bottom)); overflow-y: auto; background: rgba(15, 23, 42, .96); }
  .site-header__mobile a { display: flex; align-items: center; min-height: 48px; padding-block: .75rem; font-size: .875rem; touch-action: manipulation; }
}
</style>
