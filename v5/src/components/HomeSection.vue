<script setup>
import { onMounted, ref } from 'vue'

const nameRef = ref(null)
const displayed = ref('')
const fullName = 'Developer'
let typed = false

const particles = ['{', '}', '[', ']', '(', ')', '<', '>', '/', '*', '=', '+', ';', ':', '$', '#']

function typeWriter() {
  if (typed) return
  typed = true
  let i = 0
  const interval = setInterval(() => {
    displayed.value = fullName.slice(0, ++i)
    if (i >= fullName.length) clearInterval(interval)
  }, 100)
}

onMounted(() => {
  setTimeout(typeWriter, 500)
})
</script>

<template>
  <section id="home" class="relative min-h-screen flex items-center overflow-hidden bg-[#020617]">
    <!-- Grid Background -->
    <div class="absolute inset-0 grid-bg opacity-60 pointer-events-none"></div>

    <!-- Floating Particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <span
        v-for="(p, i) in particles"
        :key="i"
        class="particle"
        :style="{
          left: `${5 + (i * 6) % 90}%`,
          animationDuration: `${12 + (i * 3) % 10}s`,
          animationDelay: `${(i * 0.8) % 8}s`,
          fontSize: `${1 + (i % 3) * 0.4}rem`
        }"
      >{{ p }}</span>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 grid md:grid-cols-2 gap-16 items-center">

      <!-- LEFT: Text -->
      <div class="flex flex-col gap-6">
        <!-- Greeting -->
        <p class="font-mono text-[#c084fc] text-lg tracking-widest">
          Hello, I'm <span class="cursor-blink"></span>
        </p>

        <!-- Name -->
        <h1 class="font-mono font-extrabold leading-tight">
          <span class="text-[#a78bfa] text-4xl md:text-6xl">const</span>
          <span class="text-[#f1f5f9] text-4xl md:text-6xl mx-3">=</span>
          <span class="gradient-text text-4xl md:text-6xl">{{ displayed || '\u00A0' }}</span>
          <span class="text-[#c084fc] text-4xl md:text-6xl">;</span>
          <br/>
          <span class="text-[#67e8f9] text-2xl md:text-3xl font-light mt-2 block">羅仕林 Eden Lo</span>
        </h1>

        <!-- Title -->
        <p class="font-mono text-[#67e8f9] text-base md:text-lg">
          <span class="text-[#94a3b8]">// </span>AI Application Engineer &amp; Frontend Developer
        </p>

        <!-- Description -->
        <p class="text-[#cbd5e1] leading-relaxed max-w-xl text-base">
          將多年的前端工程底蘊，融入 Agentic Coding 的思維框架，
          精準駕馭 AI 工具，讓每一行程式碼都有意圖，讓每一個產品都有溫度。
        </p>

        <!-- Quote -->
        <div class="glass rounded-xl px-6 py-4 border-l-4 border-[#c084fc] max-w-xl">
          <p class="font-mono text-[#f1f5f9] italic">
            "每一次轉變，都是成就更好自己的開始。"
          </p>
        </div>

        <!-- Buttons -->
        <div class="flex flex-wrap gap-4 mt-2">
          <a href="#projects" class="gradient-bg text-white font-semibold px-8 py-3 rounded-xl transition-transform hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(192,132,252,0.4)]">
            View Projects
          </a>
          <a href="#about" class="border border-[#c084fc] text-[#c084fc] font-semibold px-8 py-3 rounded-xl transition-all hover:bg-[#c084fc] hover:text-white hover:-translate-y-1">
            About Me
          </a>
        </div>

        <!-- Social Icons -->
        <div class="flex gap-3 mt-2">
          <a href="https://github.com/a25814740" target="_blank" class="w-12 h-12 flex items-center justify-center bg-[#1e293b] border border-[#334155] rounded-xl text-[#94a3b8] hover:text-[#c084fc] hover:border-[#c084fc] hover:-translate-y-1 transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="mailto:a25814740@gmail.com" class="w-12 h-12 flex items-center justify-center bg-[#1e293b] border border-[#334155] rounded-xl text-[#94a3b8] hover:text-[#c084fc] hover:border-[#c084fc] hover:-translate-y-1 transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
          <a href="tel:0910412606" class="w-12 h-12 flex items-center justify-center bg-[#1e293b] border border-[#334155] rounded-xl text-[#94a3b8] hover:text-[#c084fc] hover:border-[#c084fc] hover:-translate-y-1 transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.58 5 2 2 0 0 1 3.54 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.7a16 16 0 0 0 6 6l.82-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 18v3-3.08Z"/></svg>
          </a>
        </div>
      </div>

      <!-- RIGHT: Profile -->
      <div class="relative flex items-center justify-center">
        <!-- Glow -->
        <div class="absolute w-[420px] h-[420px] rounded-full opacity-30 pointer-events-none" style="background: radial-gradient(circle, rgba(192,132,252,0.4) 0%, transparent 70%); animation: profilePulse 3s ease-in-out infinite;"></div>

        <!-- Profile Circle -->
        <div class="relative w-80 h-80 rounded-full border-4 border-[#c084fc] glow-primary overflow-hidden bg-[#1e293b] flex items-center justify-center z-10">
          <img src="https://picsum.photos/id/1025/400/400" alt="Eden Lo" class="w-full h-full object-cover" />
          <!-- code icon overlay -->
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="font-mono text-8xl font-bold text-[#c084fc] opacity-20 select-none">&lt;/&gt;</span>
          </div>
        </div>

        <!-- Floating Badges -->
        <div class="absolute top-0 right-0 glass px-5 py-3 rounded-2xl float-badge z-20 max-w-[220px]" style="animation-delay: 0s;">
          <p class="font-mono text-xs text-[#c084fc] font-bold">⚡ Agentic Coding</p>
          <p class="text-[#94a3b8] text-xs mt-1">Codex · Antigravity · Claude</p>
        </div>
        <div class="absolute bottom-10 right-0 glass px-5 py-3 rounded-2xl float-badge z-20 max-w-[220px]" style="animation-delay: 1s;">
          <p class="font-mono text-xs text-[#67e8f9] font-bold">🔧 Frontend</p>
          <p class="text-[#94a3b8] text-xs mt-1">Vue · JS · CSS · RWD</p>
        </div>
        <div class="absolute bottom-24 left-0 glass px-5 py-3 rounded-2xl float-badge z-20 max-w-[200px]" style="animation-delay: 2s;">
          <p class="font-mono text-xs text-[#fbbf24] font-bold">📍 Taichung, TW</p>
          <p class="text-[#94a3b8] text-xs mt-1">Open to Collaborate</p>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#94a3b8] z-10">
      <div class="w-7 h-12 border-2 border-[#334155] rounded-full flex justify-center pt-2">
        <div class="w-1.5 h-3 bg-[#c084fc] rounded-full" style="animation: scrollWheel 2s ease-in-out infinite;"></div>
      </div>
      <span class="font-mono text-xs tracking-widest uppercase">Scroll Down</span>
    </div>
  </section>
</template>
