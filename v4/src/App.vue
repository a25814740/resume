<script setup lang="ts">
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Code2,
  Command,
  Download,
  ExternalLink,
  Mail,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  X,
} from '@lucide/vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import {
  certificates,
  experiences,
  filterProjects,
  heroFacts,
  navItems,
  profile,
  projectCategories,
  skillGroups,
  terminalLines,
  workflowNodes,
  type Experience,
  type Project,
  type ProjectCategory,
} from './data/portfolio';

const activeSkillId = ref(skillGroups[0]?.id ?? '');
const activeWorkflowId = ref(workflowNodes[0]?.id ?? '');
const activeCategory = ref<ProjectCategory>('全部');
const selectedProject = ref<Project | null>(null);
const timelineMode = ref<'technical' | 'full'>('technical');
const isMenuOpen = ref(false);
const isCommandOpen = ref(false);
const isScrolled = ref(false);
const toastMessage = ref('');
const theme = ref<'dark' | 'light'>('dark');
const pointerStyle = ref({ '--pointer-x': '50%', '--pointer-y': '20%' });
let toastTimer: number | undefined;

const filteredProjects = computed(() => filterProjects(activeCategory.value));

const visibleExperiences = computed<Experience[]>(() => {
  if (timelineMode.value === 'full') {
    return experiences;
  }

  return experiences.filter((experience) => experience.mode === 'technical');
});

const activeWorkflow = computed(() => workflowNodes.find((node) => node.id === activeWorkflowId.value) ?? workflowNodes[0]);

function scrollTo(href: string) {
  const target = document.querySelector<HTMLElement>(href);
  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  isMenuOpen.value = false;
  isCommandOpen.value = false;
}

function openProject(project: Project) {
  selectedProject.value = project;
  document.body.classList.add('modal-lock');
}

function closeProject() {
  selectedProject.value = null;
  document.body.classList.remove('modal-lock');
}

function showToast(message: string) {
  toastMessage.value = message;
  if (toastTimer) {
    window.clearTimeout(toastTimer);
  }
  toastTimer = window.setTimeout(() => {
    toastMessage.value = '';
  }, 2400);
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email);
    showToast('Email 已複製，可以直接貼給對方了。');
  } catch {
    showToast(`請手動複製：${profile.email}`);
  }
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme.value;
}

function handleKeydown(event: KeyboardEvent) {
  const isCommandKey = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';
  if (isCommandKey) {
    event.preventDefault();
    isCommandOpen.value = !isCommandOpen.value;
    return;
  }

  if (event.key === 'Escape') {
    isCommandOpen.value = false;
    isMenuOpen.value = false;
    closeProject();
  }
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}

function handlePointerMove(event: MouseEvent) {
  pointerStyle.value = {
    '--pointer-x': `${event.clientX}px`,
    '--pointer-y': `${event.clientY}px`,
  };
}

onMounted(() => {
  document.documentElement.dataset.theme = theme.value;
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  handleScroll();

  const revealTargets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 },
  );

  revealTargets.forEach((target) => observer.observe(target));

  onBeforeUnmount(() => {
    observer.disconnect();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('pointermove', handlePointerMove);
  document.body.classList.remove('modal-lock');
  if (toastTimer) {
    window.clearTimeout(toastTimer);
  }
});
</script>

<template>
  <div class="site-shell" :style="pointerStyle">
    <header class="site-header" :class="{ 'is-scrolled': isScrolled }">
      <a class="brand-mark" href="#home" aria-label="回到首頁" @click.prevent="scrollTo('#home')">
        <span>EL</span>
        <strong>Eden Luo</strong>
      </a>

      <nav class="desktop-nav" aria-label="主要導覽">
        <a v-for="item in navItems" :key="item.href" :href="item.href" @click.prevent="scrollTo(item.href)">
          {{ item.label }}
        </a>
      </nav>

      <div class="header-actions">
        <button class="icon-button" type="button" aria-label="開啟快速跳轉" @click="isCommandOpen = true">
          <Command :size="18" />
        </button>
        <button class="icon-button" type="button" aria-label="切換深淺色模式" @click="toggleTheme">
          <Sun v-if="theme === 'dark'" :size="18" />
          <Moon v-else :size="18" />
        </button>
        <button
          class="icon-button mobile-menu-button"
          type="button"
          aria-label="開啟手機選單"
          :aria-expanded="isMenuOpen"
          @click="isMenuOpen = !isMenuOpen"
        >
          <Menu v-if="!isMenuOpen" :size="20" />
          <X v-else :size="20" />
        </button>
      </div>
    </header>

    <div class="mobile-nav" :class="{ 'is-open': isMenuOpen }">
      <a v-for="item in navItems" :key="item.href" :href="item.href" @click.prevent="scrollTo(item.href)">
        {{ item.label }}
      </a>
    </div>

    <main>
      <section id="home" class="hero section-pad">
        <div class="container hero-grid">
          <div class="hero-copy" data-reveal>
            <p class="section-kicker">2026 Developer Portfolio</p>
            <h1>
              <span>{{ profile.name }}</span>
              <span>{{ profile.englishName }}</span>
            </h1>
            <div class="type-line" aria-label="Frontend Developer × AI Workflow Builder">
              {{ profile.title }}
            </div>
            <p class="hero-summary">{{ profile.summary }}</p>
            <p class="hero-position">{{ profile.headline }}</p>

            <div class="hero-actions" aria-label="主要操作">
              <button class="primary-button" type="button" @click="scrollTo('#projects')">
                查看作品集
                <ArrowRight :size="18" />
              </button>
              <button class="ghost-button" type="button" @click="scrollTo('#experience')">查看經歷</button>
              <button class="ghost-button" type="button" @click="scrollTo('#workflow')">查看 AI 應用</button>
              <a class="ghost-button" :href="profile.pdfUrl" download>
                <Download :size="17" />
                PDF 履歷
              </a>
              <button class="text-button" type="button" @click="scrollTo('#contact')">聯絡我</button>
            </div>

            <ul class="hero-facts" aria-label="能力摘要">
              <li v-for="fact in heroFacts" :key="fact">{{ fact }}</li>
            </ul>
          </div>

          <div class="workflow-visual" data-reveal>
            <div class="orbit-label">
              <Sparkles :size="18" />
              AI Workflow Map
            </div>
            <div class="workflow-path" aria-label="需求到 Demo 的流程">
              <button
                v-for="node in workflowNodes"
                :key="node.id"
                class="workflow-dot"
                type="button"
                :class="{ 'is-active': activeWorkflowId === node.id }"
                @click="activeWorkflowId = node.id"
              >
                <span>{{ node.title }}</span>
                <strong>{{ node.tool }}</strong>
              </button>
            </div>
            <div class="terminal-panel" aria-live="polite">
              <div class="terminal-top">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p v-for="line in terminalLines" :key="line">&gt; {{ line }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="section-pad about-section">
        <div class="container split-layout">
          <div class="profile-panel" data-reveal>
            <img src="/assets/photo/eden-luo.jpg" alt="羅仕林 Eden Luo 個人照片" />
            <div>
              <p>Frontend Developer</p>
              <strong>從切版、互動、後台到 AI Workflow</strong>
            </div>
          </div>

          <div class="narrative" data-reveal>
            <p class="section-kicker">About Me</p>
            <h2>我把畫面、資料與流程整理成可使用的工具。</h2>
            <p>
              我從前端切版與網頁設計開始，累積了多年的網站開發經驗。曾參與企業形象網站、活動頁、RWD 網站、後台管理介面與 API 資料呈現等專案。
            </p>
            <p>
              我的優勢不是只會單一技術，而是能理解畫面、動線、資料與使用者操作流程，並把它整理成可執行的前端介面。
            </p>
            <p>
              近年我開始將 AI 工具導入工作流，透過 ChatGPT、Codex、Gemini、Antigravity 協助更快完成需求拆解、開發規劃、Bug 排查與原型製作。AI 不是取代工程能力，而是放大工程師解決問題的速度。
            </p>
          </div>
        </div>
      </section>

      <section id="skills" class="section-pad">
        <div class="container">
          <div class="section-heading" data-reveal>
            <p class="section-kicker">Skill Matrix</p>
            <h2>不用百分比硬撐場面，改用實務情境說明能力。</h2>
          </div>

          <div class="skill-grid">
            <button
              v-for="group in skillGroups"
              :key="group.id"
              class="skill-card"
              type="button"
              :class="{ 'is-active': activeSkillId === group.id }"
              data-reveal
              @click="activeSkillId = activeSkillId === group.id ? '' : group.id"
            >
              <span class="skill-level">{{ group.level }}</span>
              <h3>{{ group.name }}</h3>
              <p>{{ group.summary }}</p>
              <ul>
                <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
              </ul>
              <div v-if="activeSkillId === group.id" class="skill-detail">
                {{ group.detail }}
              </div>
            </button>
          </div>
        </div>
      </section>

      <section id="workflow" class="section-pad lab-section">
        <div class="container lab-grid">
          <div data-reveal>
            <p class="section-kicker">AI Workflow Lab</p>
            <h2>AI 應用與自動化實作，不只是技能補充。</h2>
            <p>
              我把 AI 放進開發流程：先拆需求，再讓工具協助產出初稿，最後回到人工判斷、測試與畫面體驗。這段很像每天都在跟 AI 開站會，偶爾它很聰明，偶爾也會漏一行，人生就是這麼樸實。
            </p>
          </div>

          <div class="lab-panel" data-reveal>
            <div class="node-list" role="tablist" aria-label="AI 工具節點">
              <button
                v-for="node in workflowNodes"
                :key="node.id"
                type="button"
                role="tab"
                :aria-selected="activeWorkflowId === node.id"
                :class="{ 'is-active': activeWorkflowId === node.id }"
                @click="activeWorkflowId = node.id"
              >
                <span>{{ node.title }}</span>
                <strong>{{ node.tool }}</strong>
              </button>
            </div>

            <article v-if="activeWorkflow" class="node-detail">
              <h3>{{ activeWorkflow.tool }}</h3>
              <dl>
                <div>
                  <dt>我怎麼用</dt>
                  <dd>{{ activeWorkflow.use }}</dd>
                </div>
                <div>
                  <dt>解決什麼問題</dt>
                  <dd>{{ activeWorkflow.problem }}</dd>
                </div>
                <div>
                  <dt>產出什麼結果</dt>
                  <dd>{{ activeWorkflow.output }}</dd>
                </div>
              </dl>
            </article>
          </div>
        </div>
      </section>

      <section id="experience" class="section-pad">
        <div class="container">
          <div class="section-heading row-heading" data-reveal>
            <div>
              <p class="section-kicker">Experience Timeline</p>
              <h2>以前端主線呈現職涯，完整經歷作為補充。</h2>
            </div>
            <div class="segmented-control" aria-label="切換經歷模式">
              <button type="button" :class="{ 'is-active': timelineMode === 'technical' }" @click="timelineMode = 'technical'">
                技術經歷
              </button>
              <button type="button" :class="{ 'is-active': timelineMode === 'full' }" @click="timelineMode = 'full'">
                完整經歷
              </button>
            </div>
          </div>

          <div class="timeline">
            <article v-for="experience in visibleExperiences" :key="`${experience.period}-${experience.company}`" class="timeline-item" data-reveal>
              <time>{{ experience.period }}</time>
              <div>
                <h3>{{ experience.company }}</h3>
                <strong>{{ experience.role }}</strong>
                <p>{{ experience.summary }}</p>
                <ul>
                  <li v-for="tag in experience.tags" :key="tag">{{ tag }}</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="projects" class="section-pad project-section">
        <div class="container">
          <div class="section-heading" data-reveal>
            <p class="section-kicker">Portfolio</p>
            <h2>讓面試官在站內就能理解作品，不只丟一排外連。</h2>
          </div>

          <div class="filter-bar" aria-label="作品分類">
            <button
              v-for="category in projectCategories"
              :key="category"
              type="button"
              :class="{ 'is-active': activeCategory === category }"
              @click="activeCategory = category"
            >
              {{ category }}
            </button>
          </div>

          <div class="project-grid">
            <article
              v-for="project in filteredProjects"
              :key="project.id"
              class="project-card"
              tabindex="0"
              data-reveal
              @click="openProject(project)"
              @keydown.enter.prevent="openProject(project)"
            >
              <div class="project-image">
                <img :src="project.image" :alt="`${project.name} 截圖或識別圖`" />
              </div>
              <div class="project-body">
                <span>{{ project.group }}</span>
                <h3>{{ project.name }}</h3>
                <p>{{ project.background }}</p>
                <ul>
                  <li v-for="tech in project.stack.slice(0, 4)" :key="tech">{{ tech }}</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="section-pad certificate-section">
        <div class="container certificate-grid">
          <div data-reveal>
            <p class="section-kicker">Certificates</p>
            <h2>證照保留，但不讓它搶走作品與能力主軸。</h2>
          </div>
          <ul data-reveal>
            <li v-for="certificate in certificates" :key="certificate">
              <BadgeCheck :size="18" />
              {{ certificate }}
            </li>
          </ul>
        </div>
      </section>

      <section id="contact" class="section-pad contact-section">
        <div class="container contact-panel" data-reveal>
          <div>
            <p class="section-kicker">Contact</p>
            <h2>需要前端、AI Workflow 或自動化工具原型，可以從這裡開始。</h2>
            <p>公開網站先保留必要聯絡資訊；更完整個資與電話建議放 PDF 履歷。</p>
          </div>
          <div class="contact-actions">
            <button class="primary-button" type="button" @click="copyEmail">
              <Mail :size="18" />
              複製 Email
            </button>
            <a class="ghost-button" :href="profile.githubUrl" target="_blank" rel="noreferrer">
              <Code2 :size="18" />
              GitHub
            </a>
            <a class="ghost-button" :href="profile.resume104Url" target="_blank" rel="noreferrer">104</a>
            <a class="ghost-button" :href="profile.pdfUrl" download>
              <Download :size="18" />
              PDF Resume
            </a>
          </div>
        </div>
      </section>
    </main>

    <Transition name="fade">
      <div v-if="toastMessage" class="toast" role="status">
        <Check :size="17" />
        {{ toastMessage }}
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="isCommandOpen" class="command-backdrop" @click.self="isCommandOpen = false">
        <div class="command-palette" role="dialog" aria-modal="true" aria-label="快速跳轉">
          <div class="command-search">
            <Search :size="18" />
            <span>按 Ctrl / Cmd + K 開啟，選擇區塊快速跳轉</span>
          </div>
          <button v-for="item in navItems" :key="item.href" type="button" @click="scrollTo(item.href)">
            <span>{{ item.label }}</span>
            <ArrowRight :size="16" />
          </button>
        </div>
      </div>
    </Transition>

    <Teleport to="body">
      <Transition name="modal">
        <div v-if="selectedProject" class="modal-backdrop" @click.self="closeProject">
          <article class="project-modal" role="dialog" aria-modal="true" :aria-label="selectedProject.name">
            <button class="modal-close" type="button" aria-label="關閉作品說明" @click="closeProject">
              <X :size="20" />
            </button>
            <img :src="selectedProject.image" :alt="`${selectedProject.name} 截圖或識別圖`" />
            <div class="modal-content">
              <span>{{ selectedProject.type }}</span>
              <h2>{{ selectedProject.name }}</h2>
              <p class="case-intro">{{ selectedProject.background }}</p>

              <div class="case-meta" aria-label="作品基本資訊">
                <div>
                  <span>我的角色</span>
                  <strong>{{ selectedProject.role }}</strong>
                </div>
                <div>
                  <span>使用技術</span>
                  <strong>{{ selectedProject.stack.join(' / ') }}</strong>
                </div>
              </div>

              <section class="case-section">
                <h3>專案背景</h3>
                <p>{{ selectedProject.background }}</p>
              </section>

              <section class="case-section">
                <h3>我的角色</h3>
                <ul>
                  <li v-for="item in selectedProject.responsibility" :key="item">{{ item }}</li>
                </ul>
              </section>

              <section class="case-section">
                <h3>技術挑戰</h3>
                <ul>
                  <li v-for="item in selectedProject.challenge" :key="item">{{ item }}</li>
                </ul>
              </section>

              <section class="case-section">
                <h3>解法</h3>
                <ul>
                  <li v-for="item in selectedProject.solution" :key="item">{{ item }}</li>
                </ul>
              </section>

              <section class="case-section">
                <h3>成果</h3>
                <ul>
                  <li v-for="item in selectedProject.outcome" :key="item">{{ item }}</li>
                </ul>
              </section>

              <section class="case-section">
                <h3>可補截圖清單</h3>
                <ul class="screenshot-list">
                  <li v-for="item in selectedProject.screenshotChecklist" :key="item">{{ item }}</li>
                </ul>
              </section>

              <section class="case-section">
                <h3>學到什麼</h3>
                <p>{{ selectedProject.learning }}</p>
              </section>

              <p v-if="selectedProject.privateNote" class="private-note">{{ selectedProject.privateNote }}</p>

              <a v-if="selectedProject.demoUrl" class="primary-button" :href="selectedProject.demoUrl" target="_blank" rel="noreferrer">
                開啟 Demo
                <ExternalLink :size="17" />
              </a>
            </div>
          </article>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
