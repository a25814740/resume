<script setup>
import { ref } from 'vue';
import { skillGroups } from '../data/resume';

const activeGroup = ref(skillGroups[0].title);
</script>

<template>
  <section id="skills" class="section skills-section" aria-labelledby="skills-title">
    <div class="section-heading" data-reveal>
      <p class="eyebrow">Skills</p>
      <h2 id="skills-title">技術能力用分組呈現，讓掃讀比硬塞一整排技能更有效。</h2>
    </div>

    <div class="skill-tabs" role="tablist" aria-label="技能分類" data-reveal>
      <button
        v-for="group in skillGroups"
        :id="`tab-${group.title}`"
        :key="group.title"
        type="button"
        role="tab"
        :aria-selected="activeGroup === group.title"
        :aria-controls="`panel-${group.title}`"
        class="tab-button"
        @click="activeGroup = group.title"
      >
        {{ group.title }}
      </button>
    </div>

    <div class="skill-panels">
      <section
        v-for="group in skillGroups"
        v-show="activeGroup === group.title"
        :id="`panel-${group.title}`"
        :key="group.title"
        role="tabpanel"
        :aria-labelledby="`tab-${group.title}`"
        class="skill-panel"
      >
        <span v-for="skill in group.skills" :key="skill" class="skill-chip">
          {{ skill }}
        </span>
      </section>
    </div>
  </section>
</template>
