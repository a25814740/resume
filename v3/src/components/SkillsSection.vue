<script setup lang="ts">
import { computed, ref } from 'vue';
import { skillGroups } from '../data/resume';

const activeGroupName = ref(skillGroups[0].name);

const activeGroup = computed(() => {
  return skillGroups.find((group) => group.name === activeGroupName.value) ?? skillGroups[0];
});
</script>

<template>
  <section id="skills" class="skills-section section-shell" data-reveal>
    <div class="section-heading compact">
      <p class="section-kicker">技術能力</p>
      <h2>從畫面實作到 AI 輔助開發，重點是能落地。</h2>
    </div>

    <div class="skill-tabs" role="tablist" aria-label="技能分類">
      <button
        v-for="group in skillGroups"
        :key="group.name"
        type="button"
        role="tab"
        :aria-selected="activeGroupName === group.name"
        :class="{ 'is-active': activeGroupName === group.name }"
        @click="activeGroupName = group.name"
      >
        {{ group.name }}
      </button>
    </div>

    <div class="skill-panel" role="tabpanel">
      <p>{{ activeGroup.description }}</p>
      <ul class="skill-chip-cloud">
        <li v-for="skill in activeGroup.skills" :key="skill">{{ skill }}</li>
      </ul>
    </div>
  </section>
</template>
