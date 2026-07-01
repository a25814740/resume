<script setup>
import { skillGroups } from '../data/resume';
</script>

<template>
  <section id="skills" class="section skills-section" aria-labelledby="skills-title">
    <div class="section-heading" data-reveal>
      <p class="eyebrow">Skills</p>
      <h2 id="skills-title">技術能力</h2>
    </div>

    <div class="skill-matrix" aria-label="技能分類">
      <article
        v-for="group in skillGroups"
        :key="group.title"
        class="skill-group"
        data-reveal
      >
        <h3>{{ group.title }}</h3>
        <div class="skill-list">
          <span v-for="skill in group.skills" :key="skill" class="skill-chip">
            {{ skill }}
          </span>
        </div>
      </article>
    </div>
  </section>
</template>
