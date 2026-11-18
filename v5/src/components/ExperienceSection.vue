<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

// 工作經歷依履歷 PDF 的任職日期與內容整理，最新經歷排在前面。
const experiences = [
  {
    period: '2022/07 ~ 2023/09', role: '前端工程師', company: '美星健康科技有限公司',
    isCurrent: false, color: '#67e8f9',
    desc: '維護保險前台與後台、虛擬貨幣前台及跨境電商前台網頁，並與設計、企劃及後端團隊合作。',
    achievements: ['HTML / JavaScript / CSS / Vue 2', '串接後端 API，呈現資料', '處理線上問題並回報進度']
  },
  {
    period: '2021/01 ~ 2021/11', role: '網頁前端工程師', company: '九七科技',
    isCurrent: false, color: '#67e8f9',
    desc: '在網頁設計公司負責前台網頁的前端開發，與設計、企劃及互動工程團隊合作，並處理線上問題。',
    achievements: ['HTML / JavaScript / CSS', 'Vue 2 + Pug + Sass', '串接後端 API，呈現資料']
  },
  {
    period: '2020/01 ~ 2020/11', role: '前端網頁工程師', company: '千樂軟體開發有限公司',
    isCurrent: false, color: '#67e8f9',
    desc: '在網頁遊戲公司處理前台與後台的前端開發，包含切版規劃、套版、特效與互動設計。',
    achievements: ['HTML5 / CSS3 / jQuery / JavaScript', 'RWD / Bootstrap', 'Vue 2 前端開發與瀏覽器相容性']
  },
  {
    period: '2019/05 ~ 2019/11', role: '前端網頁工程師', company: '申樺有限公司',
    isCurrent: false, color: '#86efac',
    desc: '在網頁遊戲公司處理前端網頁開發。',
    achievements: ['HTML5 / CSS3 / jQuery / Ajax', 'RWD 響應式網頁設計', '解決主流瀏覽器相容性問題']
  },
  {
    period: '2018/10 ~ 2019/03', role: '前端網頁設計師', company: '威德網頁設計',
    isCurrent: false, color: '#86efac', desc: '在網頁設計公司負責形象網站與購物網站的前端開發，並獨立完成專案。',
    achievements: ['HTML5 / CSS3 / jQuery', 'RWD 響應式網頁設計', '解決主流瀏覽器相容性問題']
  },
  {
    period: '2015/09 ~ 2018/05', role: '前端網頁設計師', company: '英創達網路有限公司',
    isCurrent: false, color: '#fbbf24', desc: '在網頁設計公司負責形象網站與購物網站的前端開發，並獨立完成專案。',
    achievements: ['HTML5 / CSS3 / jQuery', 'RWD 響應式網頁設計', '解決主流瀏覽器相容性問題']
  },
  {
    period: '2014/06 ~ 2015/01', role: '電腦工程師', company: '威策電腦',
    isCurrent: false, color: '#94a3b8', desc: '負責電腦軟硬體安裝、故障排除、升級分析與穩定度測試，並提供委外駐點維護服務。',
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
  <section ref="sectionRef" id="experience" class="experience-section py-28 bg-[#0f172a] h-screen overflow-y-auto hide-scrollbar">
    <div class="experience-container max-w-5xl mx-auto px-6">

      <!-- Section Header -->
      <div class="section-heading text-center mb-16">
        <p class="font-mono text-[#c084fc] text-sm tracking-widest mb-3">&lt;Experience /&gt;</p>
        <h2 class="text-4xl md:text-5xl font-bold text-[#f1f5f9]">Work <span class="gradient-text">Experience</span></h2>
        <p class="text-[#94a3b8] mt-4">工作經歷與職務內容。</p>
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

.experience-section { overflow-x: clip; }

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

/* 平板直向空間不足以同時維持雙欄時間線與可讀的中文段落，改用單欄敘事。 */
@media (min-width: 768px) and (max-width: 1023px) {
  .experience-section { height: auto; min-height: 100svh; padding: 7.5rem 0 5rem; overflow: visible; }
  .experience-container { padding-inline: 2rem; }
  .timeline-line,
  .timeline-dot { left: 2rem; }
  .timeline-item { flex-direction: column !important; }
  .timeline-item > .hidden.md\:block { display: none !important; }
  .content-card { width: calc(100% - 4rem) !important; margin-right: 0 !important; margin-left: 4rem !important; }
  .timeline-observing .timeline-item:not(.in-view):nth-child(odd) .content-card,
  .timeline-observing .timeline-item:not(.in-view):nth-child(even) .content-card { transform: translateX(1.5rem); }
}

@media (max-width: 767px) {
  .experience-section { height: auto; min-height: 100svh; padding: 5.5rem 0 4rem; overflow: visible; }
  .experience-container { padding-inline: 1rem; }
  .section-heading { margin-bottom: 2.75rem; }
  .section-heading h2 { font-size: clamp(2rem, 10vw, 2.75rem); }
  .timeline-line,
  .timeline-dot { left: 1rem; }
  .timeline-item { width: 100%; }
  .content-card { width: calc(100% - 2.75rem); margin-left: 2.75rem !important; padding: 1.125rem; }
  .timeline-observing .timeline-item:not(.in-view):nth-child(odd) .content-card,
  .timeline-observing .timeline-item:not(.in-view):nth-child(even) .content-card { transform: translateX(1rem); }
}

@media (min-width: 768px) and (max-width: 900px) and (max-height: 600px) {
  .experience-section { height: auto; min-height: 44rem; overflow-y: visible; }
}
</style>
