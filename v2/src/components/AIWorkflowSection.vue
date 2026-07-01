<script setup>
import { CheckCircle2 } from '@lucide/vue';
import { workflow } from '../data/resume';
</script>

<template>
  <section id="workflow" class="section workflow-section" aria-labelledby="workflow-title">
    <div class="section-heading" data-reveal>
      <p class="eyebrow">Agentic Coding</p>
      <h2 id="workflow-title">AI 輔助開發流程</h2>
    </div>

    <div class="workflow-layout">
      <p class="workflow-statement" data-reveal>
        我使用 AI 加速開發，但不把未驗證的輸出直接當成成果。流程會回到瀏覽器、資料與使用者情境做驗證。
      </p>

      <div class="workflow-steps">
        <article v-for="(step, index) in workflow" :key="step.title" data-reveal>
          <span class="step-number">0{{ index + 1 }}</span>
          <div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.body }}</p>
          </div>
          <CheckCircle2 :size="18" aria-hidden="true" />
        </article>
      </div>
    </div>
  </section>
</template>
