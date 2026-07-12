<script setup>
import { ref } from 'vue'

const info = {
  name: '羅仕林 / Eden Lo',
  birth: '1993/08/29',
  phone: '0910-412-606',
  email: 'a25814740@gmail.com',
  location: 'Taichung, Taiwan',
  title: 'AI Application Engineer / Frontend Developer'
}

const teamMembers = [
  {
    id: 'eden',
    name: 'Eden Lo',
    role: 'Boss · AI Application Engineer',
    img: 'https://picsum.photos/id/1025/600/800',
    isBoss: true,
    desc: '具備多年前端工程底蘊，將職涯軌跡轉向 AI 應用開發。精通 Agentic Coding 理念，善於拆解複雜需求、駕馭 AI 工具鏈，將抽象想法落地為具備商業價值的數位產品。'
  },
  {
    id: 'orchestrator',
    name: 'Codex + Antigravity',
    role: 'Core Orchestrator · AI Team Lead',
    img: 'https://picsum.photos/id/250/600/800',
    isBoss: false,
    desc: '核心編排者。掌管整體專案流程，負責拆解龐大需求、分配子任務，確保所有 AI 協作皆朝著一致的架構與目標推進，是整個 AI 工作流的中樞神經。'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    role: 'Logic Lead · 需求分析師',
    img: 'https://picsum.photos/id/431/600/800',
    isBoss: false,
    desc: '邏輯分析主管。擅長深挖需求細節、釐清商業邏輯，並快速生成結構化的提案、腳本與規劃文件，是初期規劃階段不可或缺的夥伴。'
  },
  {
    id: 'claude',
    name: 'Claude',
    role: 'Review Expert · 程式碼審查長',
    img: 'https://picsum.photos/id/1040/600/800',
    isBoss: false,
    desc: '嚴謹的品質守門員。專注於程式碼審查、文案潤飾與邊界條件測試。在最終交付前，確保每一行輸出都達到高品質標準，不讓任何細節溜走。'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    role: 'Insight Specialist · 多模態分析師',
    img: 'https://picsum.photos/id/30/600/800',
    isBoss: false,
    desc: '跨領域洞察專員。提供即時的多元視角與資訊整合，在面對複雜、跨域的問題時，給予關鍵的提示與突破口，讓思路更加開闊。'
  }
]

const activeMember = ref(null)

function openMember(member) {
  activeMember.value = member
}

function closeMember() {
  activeMember.value = null
}
</script>

<template>
  <section id="about" class="h-screen w-full bg-[#0f172a] relative overflow-hidden flex flex-col justify-center items-center">
    
    <!-- Section Header (Main + Subtitle) -->
    <div class="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10 w-full" :class="{ 'opacity-0 scale-95 pointer-events-none': activeMember }" style="transition: all 0.5s ease;">
      <p class="font-mono text-[#c084fc] text-sm tracking-widest mb-2 uppercase">Core Members</p>
      <h2 class="text-4xl md:text-5xl font-bold text-[#f1f5f9] tracking-tight">Me &amp; <span class="gradient-text">AI Team</span></h2>
    </div>

    <!-- Team Layout (ecreative fullpage blocks) -->
    <div class="w-full h-full flex flex-row items-end justify-center pt-32 pb-16 px-6 gap-2 md:gap-4 lg:gap-6 z-0" :class="{ 'opacity-0 scale-105 pointer-events-none': activeMember }" style="transition: all 0.5s ease;">
      <div 
        v-for="(member, index) in teamMembers" 
        :key="member.id"
        class="team-member-block relative rounded-2xl overflow-hidden cursor-pointer group"
        @click="openMember(member)"
      >
        <!-- Image with subtle CSS animation simulating GIF breathing -->
        <img :src="member.img" class="w-full h-full object-cover filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" style="animation: breathe 8s infinite alternate;" :style="{ animationDelay: `${index * 0.5}s` }" />
        
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
        
        <!-- Hover Content -->
        <div class="absolute bottom-0 left-0 w-full p-4 md:p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div v-if="member.isBoss" class="absolute -top-6 left-6 bg-[#c084fc] text-white text-xs font-bold font-mono px-2 py-1 rounded">BOSS</div>
          <p class="font-mono text-[#c084fc] text-[10px] md:text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-1">{{ member.role }}</p>
          <h3 class="text-lg md:text-2xl font-bold text-white whitespace-nowrap">{{ member.name }}</h3>
        </div>
      </div>
    </div>

    <!-- Detail Panel Overlay (Full screen or prominent modal) -->
    <transition name="panel-slide">
      <div v-if="activeMember" class="absolute inset-0 z-50 bg-[#020617]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto">
        
        <button @click="closeMember" class="absolute top-8 right-8 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-[#c084fc] hover:text-white transition-colors group z-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" class="group-hover:rotate-90 transition-transform duration-300"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div class="max-w-4xl w-full flex flex-col md:flex-row gap-10 items-center">
          <!-- Member Image -->
          <div class="w-48 h-48 md:w-80 md:h-80 flex-shrink-0 rounded-full md:rounded-3xl overflow-hidden border-4 border-[#c084fc] glow-primary">
            <img :src="activeMember.img" class="w-full h-full object-cover" />
          </div>

          <!-- Info & Bio -->
          <div class="flex-1 text-center md:text-left">
            <p class="font-mono text-[#c084fc] text-sm tracking-widest uppercase mb-2">{{ activeMember.role }}</p>
            <h3 class="text-4xl md:text-5xl font-bold text-white mb-6">{{ activeMember.name }}</h3>
            
            <!-- Boss Specific Info Block (Integrated) -->
            <div v-if="activeMember.isBoss" class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-8 bg-[#1e293b]/50 p-6 rounded-2xl border border-[#334155]">
              <div class="flex gap-3"><span class="font-mono text-[#c084fc] w-16 text-right">Name</span><span class="text-[#f1f5f9]">{{ info.name }}</span></div>
              <div class="flex gap-3"><span class="font-mono text-[#c084fc] w-16 text-right">Birth</span><span class="text-[#f1f5f9]">{{ info.birth }}</span></div>
              <div class="flex gap-3"><span class="font-mono text-[#c084fc] w-16 text-right">Phone</span><a :href="'tel:' + info.phone" class="text-[#f1f5f9] hover:text-[#67e8f9]">{{ info.phone }}</a></div>
              <div class="flex gap-3"><span class="font-mono text-[#c084fc] w-16 text-right">Email</span><a :href="'mailto:' + info.email" class="text-[#f1f5f9] hover:text-[#67e8f9]">{{ info.email }}</a></div>
            </div>

            <p class="text-[#cbd5e1] text-lg leading-relaxed">{{ activeMember.desc }}</p>
          </div>
        </div>

      </div>
    </transition>
    
  </section>
</template>

<style scoped>
/* Flex basis layout for team members to ensure they take up proportional width and expand nicely */
.team-member-block {
  flex: 1;
  height: 60vh;
  min-width: 15vw;
  max-width: 25vw;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.team-member-block:hover {
  flex: 1.5;
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  z-index: 10;
}

@keyframes breathe {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}

.panel-slide-enter-active, .panel-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.panel-slide-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.panel-slide-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
