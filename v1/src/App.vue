<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Bot,
  Braces,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  ExternalLink,
  LayoutDashboard,
  Mail,
  MapPin,
  MousePointer2,
  PanelsTopLeft,
  Phone,
  Sparkles,
} from '@lucide/vue';
import {
  aiProjects,
  capabilityGroups,
  conceptMeta,
  experiences,
  portfolioItems,
  profile,
  skills,
  workflow,
} from './data/resumeData';

const activeConceptId = ref(conceptMeta[0].id);
const appRoot = ref(null);
const commandCursor = ref(null);
const hoverPreview = ref(null);
const loaderRef = ref(null);
const progressBar = ref(null);
const activePreview = ref(portfolioItems[0].name);

const canUseScrollTrigger = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function';

if (canUseScrollTrigger()) {
  gsap.registerPlugin(ScrollTrigger);
}

const activeConcept = computed(() =>
  conceptMeta.find((concept) => concept.id === activeConceptId.value),
);

const reducedMotion = () =>
  import.meta.env.MODE === 'test' ||
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const animateActiveConcept = () => {
  if (reducedMotion() || !appRoot.value) return;

  const scope = appRoot.value;
  const elements = scope.querySelectorAll('.is-active [data-animate]');
  gsap.set(elements, { autoAlpha: 0, y: 22 });
  gsap.to(elements, {
    autoAlpha: 1,
    y: 0,
    duration: 0.72,
    ease: 'power3.out',
    stagger: 0.06,
    overwrite: 'auto',
  });
};

const animateCommandIntro = () => {
  if (reducedMotion() || !appRoot.value) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (loaderRef.value) {
    tl.to(loaderRef.value, {
      yPercent: -100,
      duration: 0.82,
      delay: 0.28,
      ease: 'power4.inOut',
    });
  }

  tl.fromTo(
    '.concept-command .hero-line span',
    { yPercent: 115, rotation: 2 },
    { yPercent: 0, rotation: 0, duration: 0.92, stagger: 0.08 },
    '-=0.28',
  )
    .fromTo(
      '.concept-command .hero-meta > *',
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 },
      '-=0.52',
    )
    .fromTo(
      '.concept-command .signal-card',
      { autoAlpha: 0, y: 28, scale: 0.96 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.64, stagger: 0.07 },
      '-=0.38',
    );
};

const setupScrollMotion = () => {
  if (reducedMotion() || !canUseScrollTrigger()) return;

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  gsap.utils.toArray('[data-scroll-reveal]').forEach((element) => {
    gsap.fromTo(
      element,
      { autoAlpha: 0, y: 44 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.82,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 82%',
          end: 'bottom 10%',
          toggleActions: 'play none none reverse',
        },
      },
    );
  });

  gsap.utils.toArray('.parallax-slab').forEach((element, index) => {
    gsap.to(element, {
      yPercent: index % 2 === 0 ? -10 : 10,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.7,
      },
    });
  });
};

const setConcept = async (id) => {
  activeConceptId.value = id;
  await nextTick();
  animateActiveConcept();
};

const showPreview = (item) => {
  activePreview.value = item.name;
  if (reducedMotion() || !hoverPreview.value) return;

  gsap.to(hoverPreview.value, {
    autoAlpha: 1,
    scale: 1,
    duration: 0.24,
    ease: 'power2.out',
    overwrite: 'auto',
  });
};

const hidePreview = () => {
  if (reducedMotion() || !hoverPreview.value) return;

  gsap.to(hoverPreview.value, {
    autoAlpha: 0,
    scale: 0.96,
    duration: 0.2,
    ease: 'power2.out',
    overwrite: 'auto',
  });
};

let cleanupHandlers = [];

onMounted(async () => {
  await nextTick();
  animateActiveConcept();
  animateCommandIntro();
  setupScrollMotion();

  const updateProgress = () => {
    if (!progressBar.value) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    progressBar.value.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
  cleanupHandlers.push(() => window.removeEventListener('scroll', updateProgress));

  if (!commandCursor.value || reducedMotion()) return;

  const canHover = window.matchMedia?.('(hover: hover)').matches;
  if (!canHover) return;

  const xTo = gsap.quickTo(commandCursor.value, 'x', { duration: 0.35, ease: 'power3.out' });
  const yTo = gsap.quickTo(commandCursor.value, 'y', { duration: 0.35, ease: 'power3.out' });
  const previewXTo = hoverPreview.value
    ? gsap.quickTo(hoverPreview.value, 'x', { duration: 0.45, ease: 'power3.out' })
    : null;
  const previewYTo = hoverPreview.value
    ? gsap.quickTo(hoverPreview.value, 'y', { duration: 0.45, ease: 'power3.out' })
    : null;

  const moveCursor = (event) => {
    xTo(event.clientX - 18);
    yTo(event.clientY - 18);
    previewXTo?.(event.clientX + 28);
    previewYTo?.(event.clientY - 90);
  };

  window.addEventListener('pointermove', moveCursor);
  cleanupHandlers.push(() => window.removeEventListener('pointermove', moveCursor));

  appRoot.value?.querySelectorAll('.magnetic').forEach((element) => {
    const xMagnet = gsap.quickTo(element, 'x', { duration: 0.32, ease: 'power3.out' });
    const yMagnet = gsap.quickTo(element, 'y', { duration: 0.32, ease: 'power3.out' });

    const moveMagnet = (event) => {
      const rect = element.getBoundingClientRect();
      xMagnet((event.clientX - rect.left - rect.width / 2) * 0.18);
      yMagnet((event.clientY - rect.top - rect.height / 2) * 0.18);
    };
    const resetMagnet = () => {
      xMagnet(0);
      yMagnet(0);
    };

    element.addEventListener('pointermove', moveMagnet);
    element.addEventListener('pointerleave', resetMagnet);
    cleanupHandlers.push(() => {
      element.removeEventListener('pointermove', moveMagnet);
      element.removeEventListener('pointerleave', resetMagnet);
    });
  });
});

watch(activeConceptId, async () => {
  await nextTick();
  animateActiveConcept();
  setupScrollMotion();
});

onBeforeUnmount(() => {
  cleanupHandlers.forEach((cleanup) => cleanup());
  cleanupHandlers = [];
  if (canUseScrollTrigger()) {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
  gsap.killTweensOf('*');
});
</script>

<template>
  <main ref="appRoot" class="resume-lab">
    <a class="skip-link" href="#top">跳到主要內容</a>
    <div ref="loaderRef" class="site-loader" aria-hidden="true">
      <span>Interactive Resume</span>
      <strong>Eden Lo</strong>
    </div>
    <div class="scroll-progress" aria-hidden="true">
      <span ref="progressBar"></span>
    </div>
    <div ref="commandCursor" class="command-cursor" aria-hidden="true"></div>
    <div ref="hoverPreview" class="hover-preview" aria-hidden="true">
      <span>{{ activePreview }}</span>
      <small>View project</small>
    </div>

    <nav class="concept-nav" aria-label="設計稿版本切換">
      <a class="brand-mark" href="#top" aria-label="回到頁首">
        <Braces :size="18" aria-hidden="true" />
        <span>Resume Concepts</span>
      </a>

      <div class="concept-switcher">
        <button
          v-for="concept in conceptMeta"
          :key="concept.id"
          type="button"
          class="concept-button"
          :class="{ active: activeConceptId === concept.id }"
          :aria-pressed="activeConceptId === concept.id"
          data-testid="concept-button"
          @click="setConcept(concept.id)"
        >
          <span>{{ concept.label }}</span>
          {{ concept.title }}
        </button>
      </div>
    </nav>

    <header id="top" class="overview-strip">
      <p data-testid="active-concept">{{ activeConcept.title }}｜{{ activeConcept.note }}</p>
    </header>

    <section
      v-show="activeConceptId === 'command'"
      class="concept concept-command"
      :class="{ 'is-active': activeConceptId === 'command' }"
      aria-label="中文履歷作品集設計稿"
    >
      <div class="command-hero">
        <div class="kinetic-field" aria-hidden="true">
          <span class="parallax-slab slab-one"></span>
          <span class="parallax-slab slab-two"></span>
          <span class="parallax-slab slab-three"></span>
        </div>

        <div class="hero-copy">
          <div class="hero-meta">
            <p class="eyebrow">互動式履歷 / 作品集</p>
            <span>台中，可接受混合遠端</span>
          </div>
          <h1 aria-label="羅仕林，前端與 AI 應用工程">
            <span class="hero-line"><span>{{ profile.name }}</span></span>
            <span class="hero-line"><span>前端與 AI 應用</span></span>
          </h1>
          <p class="hero-summary" data-animate>{{ profile.shortPitch }}</p>

          <div class="command-actions" data-animate>
            <a class="primary-action magnetic" :href="`mailto:${profile.email}`">
              <Mail :size="18" aria-hidden="true" />
              聯絡我
            </a>
            <a class="ghost-action magnetic" href="#command-projects">
              <PanelsTopLeft :size="18" aria-hidden="true" />
              查看作品
            </a>
          </div>
        </div>

        <aside class="hero-stage" aria-label="AI 工作流狀態">
          <div class="orbit-label" data-animate>{{ profile.englishName }} / Resume Index</div>
          <div class="signal-stack">
            <article class="signal-card is-large">
              <span>核心定位</span>
              <strong>AI 應用落地型工程師</strong>
              <p>不是模型研究，而是把需求、介面、資料流程與 AI 工具整理成可交付功能。</p>
            </article>
            <article class="signal-card">
              <span>前端底子</span>
              <strong>9~10 年網站交付</strong>
            </article>
            <article class="signal-card">
              <span>適合職務</span>
              <strong>前端 / 內部工具 / AI 應用</strong>
            </article>
          </div>
        </aside>
      </div>

      <div class="motion-marquee" aria-hidden="true">
        <div>
          <span>前端切版</span>
          <span>API 串接</span>
          <span>後台介面</span>
          <span>RWD 響應式</span>
          <span>Vue 3</span>
          <span>AI 輔助開發</span>
          <span>跨部門協作</span>
          <span>前端切版</span>
          <span>API 串接</span>
          <span>後台介面</span>
        </div>
      </div>

      <section class="command-story section-band">
        <div class="section-heading" data-scroll-reveal>
          <p>定位</p>
          <h2>不是把履歷放上網，而是讓面試官快速看懂「我能把需求落成畫面與流程」。</h2>
        </div>
        <div class="story-layout">
          <p data-scroll-reveal>{{ profile.summary }}</p>
          <div class="workflow-ribbon" data-scroll-reveal>
            <article v-for="(step, index) in workflow" :key="step">
              <span>0{{ index + 1 }}</span>
              <strong>{{ step }}</strong>
              <CheckCircle2 :size="16" aria-hidden="true" />
            </article>
          </div>
        </div>
      </section>

      <div class="command-metrics" aria-label="核心定位">
        <article v-for="group in capabilityGroups" :key="group.title" data-scroll-reveal>
          <Bot v-if="group.title.includes('AI')" :size="22" aria-hidden="true" />
          <Code2 v-else-if="group.title.includes('前端')" :size="22" aria-hidden="true" />
          <Database v-else-if="group.title.includes('API')" :size="22" aria-hidden="true" />
          <LayoutDashboard v-else :size="22" aria-hidden="true" />
          <h2>{{ group.title }}</h2>
          <p>{{ group.value }}</p>
          <small>{{ group.details }}</small>
        </article>
      </div>

      <section class="career-timeline section-band" aria-label="工作經歷時間線">
        <div class="section-heading" data-scroll-reveal>
          <p>工作經歷</p>
          <h2>從客戶網站、後台系統，到 AI 協作開發的時間線。</h2>
        </div>
        <div class="timeline-spine">
          <article
            v-for="(item, index) in experiences"
            :key="`${item.company}-${item.period}`"
            class="timeline-item"
            data-scroll-reveal
          >
            <time>{{ item.period }}</time>
            <div>
              <span>0{{ index + 1 }}</span>
              <h3>{{ item.role }}</h3>
              <p>{{ item.company }}</p>
              <ul>
                <li v-for="point in item.points" :key="point">{{ point }}</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section id="command-projects" class="section-band dark-band">
        <div class="section-heading" data-scroll-reveal>
          <p>專案方向</p>
          <h2>把 AI 從工具變成可用流程</h2>
        </div>
        <div class="project-grid command-projects">
          <article v-for="project in aiProjects" :key="project.name" data-scroll-reveal>
            <span>{{ project.type }}</span>
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
            <small>{{ project.stack }}</small>
          </article>
        </div>
      </section>

      <section class="section-band portfolio-band elevated-work">
        <div class="section-heading" data-scroll-reveal>
          <p>網站作品</p>
          <h2>作品列改成 hover preview，讓過去交付經驗變成可感知的互動證據。</h2>
        </div>
        <div class="work-list" data-scroll-reveal>
          <a
            v-for="(item, index) in portfolioItems"
            :key="item.name"
            :href="item.url"
            class="work-row"
            target="_blank"
            rel="noreferrer"
            @pointerenter="showPreview(item)"
            @pointerleave="hidePreview"
          >
            <span>0{{ index + 1 }}</span>
            <strong>{{ item.name }}</strong>
            <small>{{ item.category }}</small>
            <ExternalLink :size="20" aria-hidden="true" />
          </a>
        </div>
      </section>
    </section>

    <section
      v-show="activeConceptId === 'split'"
      class="concept concept-split"
      :class="{ 'is-active': activeConceptId === 'split' }"
      aria-label="Frontend × AI Builder 設計稿"
    >
      <div class="split-hero">
        <div class="split-half frontend-side" data-animate>
          <p class="eyebrow">Part Frontend</p>
          <h1>9~10 年前端實戰</h1>
          <p>切版、互動、RWD、API 串接、後台介面與跨部門交付。</p>
          <Code2 :size="54" aria-hidden="true" />
        </div>
        <div class="split-half ai-side" data-animate>
          <p class="eyebrow">Part AI Builder</p>
          <h1>AI 工作流落地</h1>
          <p>用 Codex / ChatGPT / Gemini 拆需求、出初版、查錯與重構。</p>
          <Sparkles :size="54" aria-hidden="true" />
        </div>
      </div>

      <section class="split-intro">
        <div data-animate>
          <p class="eyebrow">About Eden</p>
          <h2>{{ profile.shortPitch }}</h2>
        </div>
        <p data-animate>{{ profile.summary }}</p>
      </section>

      <section class="skill-mosaic" aria-label="技能矩陣">
        <article v-for="group in capabilityGroups" :key="group.title" data-animate>
          <h3>{{ group.title }}</h3>
          <strong>{{ group.value }}</strong>
          <p>{{ group.details }}</p>
        </article>
      </section>

      <section class="experience-list">
        <div class="section-heading" data-animate>
          <p>Experience</p>
          <h2>從網站交付、後台介面，到 AI 協作開發</h2>
        </div>
        <article v-for="item in experiences" :key="`${item.company}-${item.period}`" data-animate>
          <time>{{ item.period }}</time>
          <div>
            <h3>{{ item.role }}</h3>
            <p>{{ item.company }}</p>
          </div>
          <ul>
            <li v-for="point in item.points" :key="point">{{ point }}</li>
          </ul>
        </article>
      </section>

      <section class="split-portfolio">
        <div class="section-heading" data-animate>
          <p>Portfolio Wall</p>
          <h2>作品集保留視覺記憶點，但重新包成現代履歷體驗</h2>
        </div>
        <div class="masonry-grid">
          <a
            v-for="(item, index) in portfolioItems"
            :key="item.name"
            :href="item.url"
            :class="['masonry-card', `tone-${index % 4}`]"
            target="_blank"
            rel="noreferrer"
            data-animate
          >
            <span>{{ item.category }}</span>
            <strong>{{ item.name }}</strong>
            <ArrowUpRight :size="18" aria-hidden="true" />
          </a>
        </div>
      </section>
    </section>

    <section
      v-show="activeConceptId === 'dashboard'"
      class="concept concept-dashboard"
      :class="{ 'is-active': activeConceptId === 'dashboard' }"
      aria-label="Productized Resume 設計稿"
    >
      <div class="dashboard-shell">
        <aside class="dashboard-side" data-animate>
          <div>
            <strong>{{ profile.englishName }}</strong>
            <span>{{ profile.role }}</span>
          </div>
          <a href="#dash-overview">Overview</a>
          <a href="#dash-workflow">Workflow</a>
          <a href="#dash-projects">Projects</a>
          <a href="#dash-contact">Contact</a>
        </aside>

        <div class="dashboard-main">
          <section id="dash-overview" class="dashboard-hero" data-animate>
            <div>
              <p class="eyebrow">Productized Resume</p>
              <h1>把履歷設計成一個可掃描、可驗證的工程儀表板</h1>
              <p>{{ profile.summary }}</p>
            </div>
            <div class="profile-card">
              <MapPin :size="18" aria-hidden="true" />
              <span>{{ profile.location }}</span>
              <Mail :size="18" aria-hidden="true" />
              <span>{{ profile.email }}</span>
              <Phone :size="18" aria-hidden="true" />
              <span>{{ profile.phone }}</span>
            </div>
          </section>

          <section class="stat-row" aria-label="履歷摘要數據">
            <article data-animate>
              <strong>9~10</strong>
              <span>年前端與網頁應用經驗</span>
            </article>
            <article data-animate>
              <strong>4</strong>
              <span>AI 應用 / 工作流專案方向</span>
            </article>
            <article data-animate>
              <strong>15</strong>
              <span>主要技能與工具</span>
            </article>
          </section>

          <section id="dash-workflow" class="workflow-board">
            <div class="section-heading" data-animate>
              <p>Delivery Workflow</p>
              <h2>需求不是直接丟給 AI，而是拆成可驗證流程</h2>
            </div>
            <div class="workflow-steps">
              <article v-for="(step, index) in workflow" :key="step" data-animate>
                <span>0{{ index + 1 }}</span>
                <strong>{{ step }}</strong>
                <ChevronRight :size="18" aria-hidden="true" />
              </article>
            </div>
          </section>

          <section class="capability-table" aria-label="能力表">
            <article v-for="group in capabilityGroups" :key="group.title" data-animate>
              <h3>{{ group.title }}</h3>
              <p>{{ group.value }}</p>
              <span>{{ group.details }}</span>
            </article>
          </section>

          <section id="dash-projects" class="module-grid">
            <div class="section-heading" data-animate>
              <p>Project Modules</p>
              <h2>適合投 AI 應用、內部工具、後台系統與 MarTech 職缺</h2>
            </div>
            <article v-for="project in aiProjects" :key="project.name" data-animate>
              <BriefcaseBusiness :size="20" aria-hidden="true" />
              <h3>{{ project.name }}</h3>
              <p>{{ project.description }}</p>
              <span>{{ project.stack }}</span>
            </article>
          </section>

          <section class="tag-cloud" aria-label="技術標籤">
            <span v-for="skill in skills" :key="skill" data-animate>{{ skill }}</span>
          </section>

          <section id="dash-contact" class="dashboard-contact" data-animate>
            <div>
              <p class="eyebrow">Ready for Interview</p>
              <h2>AI 應用開發專員 / 前端工程師</h2>
            </div>
            <a :href="`mailto:${profile.email}`">
              <MousePointer2 :size="18" aria-hidden="true" />
              發送 Email
            </a>
          </section>
        </div>
      </div>
    </section>
  </main>
</template>
