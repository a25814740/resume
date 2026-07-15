<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const experiences = [
  {
    period: '2025/06 ~ 現在',
    role: '足體按摩師（自學 AI 應用期）',
    company: '人蔘養生館',
    isCurrent: true,
    color: '#c084fc',
    desc: '在職期間持續自學 AI 工具，將多年前端工程背景重新整合為 AI 應用開發能力。實作 AI 輔助開發流程，包含需求拆解、Prompt 撰寫、邏輯規劃、Bug 修正、功能測試。',
    achievements: ['Agentic Coding 實務應用', 'AI 工作流整合與優化', '個人形象網站全棧開發']
  },
  {
    period: '2023/11 ~ 2025/06',
    role: '足體按摩師',
    company: '湯村足體養生館',
    isCurrent: false,
    color: '#a78bfa',
    desc: '服務業第一線，培養溝通能力、問題判斷力與耐心。同期持續進修 AI 應用，逐步整合 ChatGPT、Codex、Gemini 至開發流程。',
    achievements: ['客戶溝通與需求判斷', 'AI 工具持續自學進修']
  },
  {
    period: '2022/07 ~ 2023/09',
    role: '前端工程師',
    company: '美星健康科技有限公司',
    isCurrent: false,
    color: '#67e8f9',
    desc: '主要負責 RWD 網頁開發，解決跨瀏覽器相容性問題，參與企業形象網站與產品頁面的完整前端開發流程。',
    achievements: ['HTML5 / CSS3 / jQuery / JavaScript', 'RWD 響應式網頁設計', '主流瀏覽器相容性處理']
  },
  {
    period: '2021/01 ~ 2021/11',
    role: '網頁前端工程師',
    company: '九七科技有限公司',
    isCurrent: false,
    color: '#67e8f9',
    desc: '與視覺設計團隊配合，使用 Vue + Pug + Sass 組合進行現代化前端開發，負責串接後端 API 與前端互動實作。',
    achievements: ['Vue.js + Pug + Sass 前端開發', 'RESTful API 串接', '跨部門設計協作']
  },
  {
    period: '2020/01 ~ 2020/11',
    role: '前端網頁工程師',
    company: '千樂軟體開發有限公司',
    isCurrent: false,
    color: '#67e8f9',
    desc: '具網站切版規劃、套版、特效、互動設計能力，累積 Vue.js 前端框架實務經驗。',
    achievements: ['網站切版與互動設計', 'Vue.js 前端框架']
  },
  {
    period: '2019/05 ~ 2019/11',
    role: '前端網頁工程師',
    company: '申樺有限公司',
    isCurrent: false,
    color: '#86efac',
    desc: '前端工程開發，獨立完成 RWD 網站專案，熟悉企業客製化網站開發流程。',
    achievements: ['獨立完成 RWD 專案', '客製化企業網站開發']
  },
  {
    period: '2018/10 ~ 2019/05',
    role: '前端網頁切版特效師',
    company: '威德網頁設計',
    isCurrent: false,
    color: '#86efac',
    desc: '專職前端切版與特效開發，累積大量網頁設計專案實作經驗。',
    achievements: ['前端切版與特效設計']
  },
  {
    period: '2015/09 ~ 2018/10',
    role: '前端網頁切版特效師',
    company: '英創達網路有限公司',
    isCurrent: false,
    color: '#fbbf24',
    desc: '職涯起點。在業界知名的網頁設計公司英創達，從事企業形象網站的前端開發工作，奠定了紮實的網頁技術基礎。',
    achievements: ['企業形象網站前端開發', '多種產業客戶合作', '網頁特效與動畫設計']
  },
  {
    period: '2015/06',
    role: '學歷',
    company: '臺中科技大學 資訊管理系 畢業',
    isCurrent: false,
    color: '#94a3b8',
    desc: '',
    achievements: []
  }
]

const sectionRef = ref(null)
let itemObserver

onMounted(() => {
  if (!sectionRef.value || !('IntersectionObserver' in window)) return

  sectionRef.value.classList.add('timeline-observing')
  itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => entry.target.classList.toggle('in-view', entry.isIntersecting))
  }, {
    root: document.querySelector('[data-scroll-container]'),
    rootMargin: '0px 0px -12% 0px',
    threshold: .12,
  })
  sectionRef.value.querySelectorAll('.timeline-item').forEach(item => itemObserver.observe(item))
})

onBeforeUnmount(() => {
  itemObserver?.disconnect()
})

</script>

<template>
  <section ref="sectionRef" id="experience" class="py-28 bg-[#0f172a] h-screen overflow-y-auto hide-scrollbar">
    <div class="max-w-5xl mx-auto px-6">

      <!-- Section Header -->
      <div class="text-center mb-16">
        <p class="font-mono text-[#c084fc] text-sm tracking-widest mb-3">&lt;Experience /&gt;</p>
        <h2 class="text-4xl md:text-5xl font-bold text-[#f1f5f9]">Work <span class="gradient-text">Experience</span></h2>
        <p class="text-[#94a3b8] mt-4">從前端工程到 AI 應用，不斷迭代的人生旅程。</p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div class="timeline-line absolute top-0 bottom-0 w-0.5 opacity-60 z-0"></div>

        <div class="space-y-12">
          <div
            v-for="(exp, i) in experiences"
            :key="i"
            class="timeline-item visible relative flex flex-col md:flex-row"
            :class="i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
          >
            <!-- Timeline dot -->
            <div class="timeline-dot absolute w-4 h-4 rounded-full pulse-dot border-2 border-[#0f172a] z-10 mt-3"
              :style="{ backgroundColor: exp.color }"></div>

            <!-- Spacer for opposite side on desktop -->
            <div class="hidden md:block md:w-1/2"></div>

            <!-- Content card -->
            <div
              :class="[
                'content-card visible ml-20 md:ml-0 md:w-1/2 glass rounded-2xl p-6 cursor-default transition-all duration-300 hover:border-[#c084fc]/50 z-10',
                i % 2 === 0 ? 'md:ml-12 left-card' : 'md:mr-12 right-card'
              ]"
            >
              <!-- Period + Badge -->
              <div class="flex items-center gap-3 mb-3">
                <span class="font-mono text-sm font-bold" :style="{ color: exp.color }">{{ exp.period }}</span>
                <span v-if="exp.isCurrent" class="gradient-bg text-white text-xs font-bold font-mono px-3 py-1 rounded-full">Current</span>
              </div>

              <!-- Role + Company -->
              <h3 class="font-mono text-lg font-bold text-[#67e8f9] mb-1">{{ exp.role }}</h3>
              <p class="text-[#a78bfa] text-sm font-medium mb-3">🏢 {{ exp.company }}</p>

              <!-- Desc -->
              <p v-if="exp.desc" class="text-[#cbd5e1] text-sm leading-relaxed mb-4">{{ exp.desc }}</p>

              <!-- Achievements -->
              <div v-if="exp.achievements.length" class="bg-[#020617] rounded-xl p-4 border-l-4" :style="{ borderColor: exp.color }">
                <div v-for="ach in exp.achievements" :key="ach" class="flex items-start gap-2 text-sm text-[#cbd5e1] mb-1 last:mb-0">
                  <span class="text-[#86efac] mt-0.5 flex-shrink-0">✓</span>
                  <span>{{ ach }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
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

.timeline-line,
.timeline-dot { left: 2rem; transform: translateX(-50%); }

.pulse-dot { opacity: 1; transition: opacity .4s ease, transform .5s cubic-bezier(.16, 1, .3, 1); }

.content-card {
  opacity: 1;
  transform: translateX(0);
  transition: opacity .48s ease, transform .64s cubic-bezier(.16, 1, .3, 1);
}

.timeline-observing .timeline-item:not(.in-view) .pulse-dot { opacity: 0; transform: translateX(-50%) scale(.45); }
.timeline-observing .timeline-item:not(.in-view):nth-child(odd) .content-card { opacity: 0; transform: translateX(3.5rem); }
.timeline-observing .timeline-item:not(.in-view):nth-child(even) .content-card { opacity: 0; transform: translateX(-3.5rem); }
.timeline-observing .timeline-item.in-view .pulse-dot { opacity: 1; transform: translateX(-50%) scale(1); }
.timeline-observing .timeline-item.in-view .content-card { opacity: 1; transform: translateX(0); }

@media (min-width: 768px) {
  .timeline-line,
  .timeline-dot { left: 50%; }
}

@media (max-width: 767px) {
  .timeline-observing .timeline-item:not(.in-view) .content-card { transform: translateX(2.5rem); }
}
</style>
