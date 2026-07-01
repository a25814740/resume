<script setup>
import { ref } from 'vue';
import AppHeader from './components/AppHeader.vue';
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import StrengthSection from './components/StrengthSection.vue';
import AIWorkflowSection from './components/AIWorkflowSection.vue';
import ExperienceTimeline from './components/ExperienceTimeline.vue';
import SkillsSection from './components/SkillsSection.vue';
import ContactSection from './components/ContactSection.vue';
import ProjectShowcase from './components/ProjectShowcase.vue';
import ScrollProgress from './components/ScrollProgress.vue';
import { useReveal } from './composables/useReveal';

const appRoot = ref(null);

useReveal(appRoot);
</script>

<template>
  <div ref="appRoot" class="site-shell">
    <a class="skip-link" href="#main-content">跳到主要內容</a>
    <ScrollProgress />
    <AppHeader />

    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <StrengthSection />
      <AIWorkflowSection />
      <ExperienceTimeline />
      <SkillsSection />
      <ContactSection />
      <ProjectShowcase />
    </main>
  </div>
</template>
