<script setup>
import { onMounted } from 'vue'

const categories = [
  {
    id: 'agentic',
    title: 'Agentic Coding',
    color: '#c084fc',
    skills: [
      { name: 'ChatGPT / Codex', pct: 90 },
      { name: 'Gemini / Antigravity', pct: 88 },
      { name: 'Prompt Engineering', pct: 85 },
      { name: 'AI Workflow Integration', pct: 82 },
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    color: '#67e8f9',
    skills: [
      { name: 'HTML5 / CSS3 / SASS', pct: 95 },
      { name: 'JavaScript / jQuery', pct: 92 },
      { name: 'Vue.js / Pug', pct: 88 },
      { name: 'RWD / Bootstrap', pct: 93 },
    ]
  },
  {
    id: 'integration',
    title: 'Integration & Tools',
    color: '#a78bfa',
    skills: [
      { name: 'RESTful API', pct: 80 },
      { name: 'Git / GitHub', pct: 85 },
      { name: 'System Integration', pct: 75 },
      { name: 'Vite / Webpack', pct: 78 },
    ]
  },
  {
    id: 'design',
    title: 'Design & Media',
    color: '#fbbf24',
    skills: [
      { name: 'Adobe Photoshop', pct: 78 },
      { name: 'Adobe Illustrator', pct: 72 },
      { name: 'UI/UX Implementation', pct: 82 },
      { name: 'Figma', pct: 65 },
    ]
  }
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add a small delay to ensure CSS transition can happen if just mounted
          setTimeout(() => {
            entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
              const pct = bar.getAttribute('data-pct')
              bar.style.width = pct + '%'
            })
          }, 100)
          
          entry.target.querySelectorAll('.pct-label').forEach(label => {
            const target = parseInt(label.getAttribute('data-target'))
            let current = 0
            if (label.dataset.animated) return
            label.dataset.animated = 'true'
            const interval = setInterval(() => {
              current = Math.min(current + 2, target)
              label.textContent = current + '%'
              if (current >= target) clearInterval(interval)
            }, 25)
          })
        } else {
          // Reset when out of view so it animates again next time
          entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
            bar.style.width = '0%'
          })
          entry.target.querySelectorAll('.pct-label').forEach(label => {
            label.textContent = '0%'
            delete label.dataset.animated
          })
        }
      })
    },
    { threshold: 0.3 }
  )
  document.querySelectorAll('.skill-category').forEach(el => observer.observe(el))
})
</script>

<template>
  <section id="skills" class="min-h-screen py-28 bg-[#020617]">
    <div class="max-w-7xl mx-auto px-6">

      <!-- Section Header -->
      <div class="text-center mb-16">
        <p class="font-mono text-[#c084fc] text-sm tracking-widest mb-3">&lt;Skills /&gt;</p>
        <h2 class="text-4xl md:text-5xl font-bold text-[#f1f5f9]">Professional <span class="gradient-text">Skills</span></h2>
        <p class="text-[#94a3b8] mt-4">揉合前端技術與 AI 開發思維，打造高效能的工作流。</p>
      </div>

      <!-- Skill Categories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="cat in categories"
          :key="cat.id"
          class="skill-category glass rounded-3xl p-8"
        >
          <!-- Category Title -->
          <h3 class="font-mono font-extrabold text-xl mb-8" :style="{ color: cat.color }">
            {{ cat.title }}
          </h3>

          <!-- Skills -->
          <div class="space-y-6">
            <div v-for="skill in cat.skills" :key="skill.name">
              <div class="flex justify-between mb-2">
                <span class="font-mono text-sm text-[#67e8f9]">{{ skill.name }}</span>
                <span class="font-mono text-sm pct-label" :style="{ color: cat.color }" :data-target="skill.pct">0%</span>
              </div>
              <div class="w-full h-3 bg-[#020617] border border-[#334155] rounded-full overflow-hidden">
                <div
                  class="skill-bar-fill"
                  :data-pct="skill.pct"
                  :style="{ background: `linear-gradient(90deg, ${cat.color}, #67e8f9)`, boxShadow: `0 0 10px ${cat.color}66` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
