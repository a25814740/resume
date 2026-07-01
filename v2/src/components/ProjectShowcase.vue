<script setup>
import { ref } from 'vue';
import { ArrowUpRight } from '@lucide/vue';
import { projects } from '../data/projects';

const activeProject = ref(projects[0].name);
</script>

<template>
  <section id="projects" class="section project-section" aria-labelledby="projects-title">
    <div class="section-heading" data-reveal>
      <p class="eyebrow">Projects</p>
      <h2 id="projects-title">作品集放在最後，讓前面的履歷敘事先把人選輪廓講清楚。</h2>
    </div>

    <div class="project-grid">
      <article
        v-for="(project, index) in projects"
        :key="project.name"
        class="project-card"
        :class="{ active: activeProject === project.name }"
        data-reveal
      >
        <button
          type="button"
          class="project-trigger"
          :aria-expanded="activeProject === project.name"
          @click="activeProject = project.name"
          @focus="activeProject = project.name"
          @pointerenter="activeProject = project.name"
        >
          <span class="card-index">0{{ index + 1 }}</span>
          <span class="project-type">{{ project.type }}</span>
          <strong>{{ project.name }}</strong>
          <ArrowUpRight :size="18" aria-hidden="true" />
        </button>

        <div class="project-visual" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="project-detail">
          <p><strong>角色</strong>{{ project.role }}</p>
          <p><strong>解決問題</strong>{{ project.problem }}</p>
          <div class="chip-row" aria-label="使用技術">
            <span v-for="tech in project.tech" :key="tech" class="chip">{{ tech }}</span>
          </div>
          <span class="coming-soon">{{ project.status }}</span>
        </div>
      </article>
    </div>
  </section>
</template>
