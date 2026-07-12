<script setup lang="ts">
import { projects } from '../data/projects';
</script>

<template>
  <section id="projects" class="projects-section section-shell" data-reveal>
    <div class="section-heading">
      <p class="section-kicker">作品集</p>
      <h2>把作品放在最下方，讓履歷先說清楚能力與職涯主軸。</h2>
      <p>
        以下先以 Case Study 卡片呈現方向與問題意識；尚未公開的作品會標示 Coming soon，不填假連結。
      </p>
    </div>

    <div class="project-grid">
      <article v-for="project in projects" :key="project.name" class="project-card" tabindex="0">
        <div class="project-visual" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="project-copy">
          <p class="project-type">{{ project.type }}</p>
          <h3>{{ project.name }}</h3>
          <p class="project-role">{{ project.role }}</p>
          <p class="project-problem">{{ project.problem }}</p>
          <ul class="chip-list">
            <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
          </ul>
          <a v-if="project.href" class="button button-quiet" :href="project.href" target="_blank" rel="noreferrer">
            查看作品
          </a>
          <button v-else class="button button-disabled" type="button" disabled>Coming soon</button>
        </div>
      </article>
    </div>
  </section>
</template>
