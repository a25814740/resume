<script setup>
import Navbar from './components/Navbar.vue'
import HomeSection from './components/HomeSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
</script>

<template>
  <div class="bg-[#020617] h-screen w-screen overflow-hidden">
    <Navbar />

    <!-- Fullpage Scroll Container -->
    <main class="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth hide-scrollbar">
      <div class="snap-start h-screen w-full relative">
        <HomeSection />
      </div>
      <div class="snap-start h-screen w-full relative">
        <AboutSection />
      </div>
      <div class="snap-start h-screen w-full relative">
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
