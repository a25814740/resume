<script setup lang="ts">
import { workflowSteps } from '../data/resume';
</script>

<template>
  <section id="workflow" class="workflow-section section-shell" data-reveal>
    <div class="workflow-intro">
      <div class="section-heading">
        <p class="section-kicker">AI 工作流</p>
        <h2>AI 負責擴大產出速度，我負責判斷方向、修正細節與驗收品質。</h2>
      </div>
      <p>
        我使用 AI 加速開發，但不把未驗證的輸出直接當成成果。每個步驟都要能回到瀏覽器、Console、API 回應或文件裡被檢查。
      </p>
    </div>

    <ol class="workflow-track" aria-label="Agentic Coding 工作流">
      <li v-for="(step, index) in workflowSteps" :key="step.title">
        <span class="step-index">{{ String(index + 1).padStart(2, '0') }}</span>
        <h3>{{ step.title }}</h3>
        <p>{{ step.body }}</p>
      </li>
    </ol>
  </section>
</template>
