<script setup>
import { onMounted, ref } from 'vue'

const displayed = ref('')
const fullName = 'Eden 仕林'
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
        <!-- 主標：姓名直接接在問候語後，保留首頁的漸層視覺焦點。 -->
        <h1 class="font-mono font-extrabold leading-tight">
          <span class="text-[#c084fc] text-lg md:text-xl tracking-widest">Hello, I'm </span>
          <span class="gradient-text text-4xl md:text-6xl">{{ displayed || '\u00A0' }}</span>
          <span class="cursor-blink text-[#c084fc] text-4xl md:text-6xl"></span>
        </h1>

        <!-- Title -->
        <p class="font-mono text-[#67e8f9] text-base md:text-lg">
          <span class="text-[#94a3b8]">// </span>AI Application Engineer &amp; Frontend Developer
        </p>

        <!-- Description -->
        <p class="text-[#cbd5e1] leading-relaxed max-w-xl text-base">
          將多年的前端工程經驗，結合 AI 協作的開發方式；
          以 AI 工具為輔，認真把每個想法一步步做成可用的產品。
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

      </div>

      <!-- RIGHT: Profile -->
      <div class="relative flex items-center justify-center">
        <!-- Glow -->
        <div class="absolute w-[420px] h-[420px] rounded-full opacity-30 pointer-events-none" style="background: radial-gradient(circle, rgba(192,132,252,0.4) 0%, transparent 70%); animation: profilePulse 3s ease-in-out infinite;"></div>

        <!-- Profile Circle -->
        <div class="relative w-80 h-80 rounded-full border-4 border-[#c084fc] glow-primary overflow-hidden bg-[#1e293b] flex items-center justify-center z-10">
          <img src="/images/eden-profile.jpg" alt="羅仕林 Eden" class="w-full h-full object-cover object-[center_25%]" />
          <!-- code icon overlay -->
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="font-mono text-8xl font-bold text-[#c084fc] opacity-20 select-none">&lt;/&gt;</span>
          </div>
        </div>

        <!-- Floating Badges -->
        <div class="absolute top-0 right-0 glass px-5 py-3 rounded-2xl float-badge z-20 max-w-[220px]" style="animation-delay: 0s;">
          <p class="font-mono text-xs text-[#c084fc] font-bold">⚡ AI 協作開發</p>
          <p class="text-[#94a3b8] text-xs mt-1">Codex · Antigravity · Ollama</p>
        </div>
        <div class="absolute bottom-10 right-0 glass px-5 py-3 rounded-2xl float-badge z-20 max-w-[220px]" style="animation-delay: 1s;">
          <p class="font-mono text-xs text-[#67e8f9] font-bold">🔧 Frontend</p>
          <p class="text-[#94a3b8] text-xs mt-1">Vue · JS · CSS · RWD</p>
        </div>
        <div class="absolute bottom-24 left-0 glass px-5 py-3 rounded-2xl float-badge z-20 max-w-[200px]" style="animation-delay: 2s;">
          <p class="font-mono text-xs text-[#fbbf24] font-bold">🌱 持續學習</p>
          <p class="text-[#94a3b8] text-xs mt-1">把想法一步步做成作品</p>
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
