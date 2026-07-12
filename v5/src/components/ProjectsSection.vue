<script setup>
import { onMounted, ref, onUnmounted } from 'vue'

const projects = [
  {
    id: 'mtr',
    title: '木頭人',
    category: 'WEB DESIGN',
    thumb: 'https://picsum.photos/id/11/800/1000',
    logo: 'https://picsum.photos/id/119/120/60',
    link: 'https://chestnutcat.xsrv.jp/download/mtr/demo/site/',
    tech: ['Frontend', 'jQuery', 'RWD'],
    desc: '木頭人品牌形象網站，完整的 RWD 響應式設計，配合品牌視覺風格進行前端開發。'
  },
  {
    id: 'grapeking',
    title: '葡萄王生技股份有限公司',
    category: 'CORPORATE SITE',
    thumb: 'https://picsum.photos/id/29/800/1000',
    logo: 'https://picsum.photos/id/219/120/60',
    link: 'https://www.grapeking.com.tw/tw/',
    tech: ['Frontend', 'CMS', 'RWD'],
    desc: '葡萄王生技企業形象網站，完整的中英文雙語切換、產品展示與電商功能整合。'
  },
  {
    id: 'repon',
    title: '南俊國際股份有限公司',
    category: 'CORPORATE SITE',
    thumb: 'https://picsum.photos/id/43/800/1000',
    logo: 'https://picsum.photos/id/349/120/60',
    link: 'https://www.repongroup.com/tw/',
    tech: ['Frontend', 'jQuery', 'RWD'],
    desc: '南俊國際企業形象網站，專業的 B2B 企業形象展示，高質感的視覺設計與流暢互動體驗。'
  },
  {
    id: 'longnew',
    title: '久馨股份有限公司',
    category: 'BRAND SITE',
    thumb: 'https://picsum.photos/id/16/800/1000',
    logo: 'https://picsum.photos/id/447/120/60',
    link: 'http://www.long-new.com/tw/',
    tech: ['Frontend', 'CSS Animation'],
    desc: '久馨股份企業形象網站，精緻的品牌形象設計，帶有流暢的 CSS 動畫與過場效果。'
  },
  {
    id: 'ranch',
    title: '十八養場',
    category: 'E-COMMERCE / BRAND',
    thumb: 'https://picsum.photos/id/176/800/1000',
    logo: 'https://picsum.photos/id/529/120/60',
    link: 'https://www.18ranch.com.tw/',
    tech: ['Frontend', 'E-commerce', 'RWD'],
    desc: '十八養場品牌電商網站，結合農場品牌形象與線上購物功能，質樸自然的視覺風格。'
  },
  {
    id: 'covid',
    title: 'COVID-19 視覺化專題',
    category: 'DATA VISUALIZATION',
    thumb: 'https://picsum.photos/id/119/800/1000',
    logo: 'https://picsum.photos/id/159/120/60',
    link: 'https://a25814740.github.io/virus.github.io/',
    tech: ['Vue', 'Data API', 'Chart'],
    desc: '勞動部職訓局前端培訓班期末專題，COVID-19 全球疫情數據視覺化，串接即時 API 展示互動圖表。'
  }
]

const scrollContainer = ref(null)
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

const activeProject = ref(null)

const handleMouseDown = (e) => {
  isDragging.value = true
  startX.value = e.pageX - scrollContainer.value.offsetLeft
  scrollLeft.value = scrollContainer.value.scrollLeft
  scrollContainer.value.style.cursor = 'grabbing'
}

const handleMouseLeave = () => {
  isDragging.value = false
  if(scrollContainer.value) scrollContainer.value.style.cursor = 'grab'
}

const handleMouseUp = () => {
  isDragging.value = false
  if(scrollContainer.value) scrollContainer.value.style.cursor = 'grab'
}

const handleMouseMove = (e) => {
  if (!isDragging.value) return
  e.preventDefault()
  const x = e.pageX - scrollContainer.value.offsetLeft
  const walk = (x - startX.value) * 2 // Scroll speed
  scrollContainer.value.scrollLeft = scrollLeft.value - walk
}

const openProject = (project) => {
  if(isDragging.value) return // Don't open if they were just dragging
  activeProject.value = project
}

const closeProject = () => {
  activeProject.value = null
}

</script>

<template>
  <section id="projects" class="h-screen w-full bg-[#020617] relative overflow-hidden flex flex-col">
    <!-- Header overlay (fixed on top) -->
    <div class="absolute top-10 left-10 z-20 pointer-events-none">
      <p class="font-mono text-[#c084fc] text-sm tracking-widest mb-1">&lt;Works /&gt;</p>
      <h2 class="text-4xl md:text-5xl font-bold text-[#f1f5f9] drop-shadow-lg">Selected <span class="gradient-text">Projects</span></h2>
    </div>

    <!-- Horizontal scroll container -->
    <div 
      ref="scrollContainer"
      class="flex-1 w-full h-full flex overflow-x-auto overflow-y-hidden hide-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory"
      @mousedown="handleMouseDown"
      @mouseleave="handleMouseLeave"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
      style="user-select: none;"
    >
      <!-- Spacer for header -->
      <div class="w-[20vw] flex-shrink-0 snap-start h-full flex items-center justify-center border-r border-[#334155]/30">
        <div class="rotate-[-90deg] font-mono tracking-widest text-[#94a3b8] whitespace-nowrap opacity-50">
          DRAG TO EXPLORE ⟶
        </div>
      </div>

      <!-- Project Strips -->
      <div 
        v-for="project in projects" 
        :key="project.id"
        class="w-[80vw] md:w-[35vw] lg:w-[25vw] h-full flex-shrink-0 snap-center relative border-r border-[#334155]/30 group transition-all duration-500 overflow-hidden"
        @click="openProject(project)"
      >
        <!-- Background Image -->
        <img :src="project.thumb" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" />
        
        <!-- Overlay Dark Gradient -->
        <div class="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent"></div>

        <!-- Content -->
        <div class="absolute bottom-0 left-0 w-full p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
          <img :src="project.logo" class="h-12 object-contain mb-4 filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity" />
          <h3 class="text-2xl font-bold text-white mb-2">{{ project.title }}</h3>
          <p class="font-mono text-[#c084fc] text-xs tracking-widest mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{{ project.category }}</p>
          <div class="w-12 h-1 bg-[#67e8f9] rounded-full group-hover:w-full transition-all duration-500"></div>
        </div>
      </div>
      
      <!-- End Spacer -->
      <div class="w-[10vw] flex-shrink-0 h-full"></div>
    </div>

    <!-- Project Detail Overlay (Click to Expand) -->
    <transition name="slide-up">
      <div v-if="activeProject" class="absolute inset-0 z-50 bg-[#020617] flex flex-col md:flex-row overflow-hidden">
        
        <!-- Left: Large Image area -->
        <div class="relative w-full md:w-3/5 h-[40vh] md:h-full bg-[#0f172a]">
          <img :src="activeProject.thumb" class="w-full h-full object-cover opacity-80" />
          <div class="absolute inset-0 bg-gradient-to-r from-transparent to-[#020617]"></div>
          
          <!-- Back button -->
          <button @click="closeProject" class="absolute top-8 left-8 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-[#c084fc] transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" stroke-width="2" class="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
        </div>

        <!-- Right: Detail Content -->
        <div class="w-full md:w-2/5 h-[60vh] md:h-full p-10 md:p-16 flex flex-col justify-center overflow-y-auto">
          <img :src="activeProject.logo" class="h-16 object-contain self-start mb-8 filter brightness-0 invert" />
          <p class="font-mono text-[#c084fc] text-sm tracking-widest mb-3">{{ activeProject.category }}</p>
          <h2 class="text-4xl font-bold text-white mb-6">{{ activeProject.title }}</h2>
          <p class="text-[#cbd5e1] text-lg leading-relaxed mb-8">{{ activeProject.desc }}</p>
          
          <div class="flex flex-wrap gap-3 mb-10">
            <span v-for="t in activeProject.tech" :key="t" class="font-mono text-sm text-[#67e8f9] bg-[#67e8f9]/10 border border-[#67e8f9]/30 px-4 py-2 rounded-full">
              {{ t }}
            </span>
          </div>

          <a :href="activeProject.link" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-8 py-4 bg-[#c084fc] text-white font-bold rounded-xl hover:bg-[#a78bfa] transition-colors self-start hover:-translate-y-1 hover:shadow-lg">
            Visit Website
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
          </a>
        </div>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
