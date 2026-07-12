export type Strength = {
  title: string;
  description: string;
  tags: string[];
};

export type Experience = {
  period: string;
  company: string;
  role: string;
  summary: string;
  tags: string[];
  secondary?: boolean;
};

export type SkillGroup = {
  name: string;
  description: string;
  skills: string[];
};

export const profile = {
  name: '羅仕林',
  englishName: 'Eden',
  title: 'AI 應用開發專員 / 前端工程師',
  location: '台中市',
  email: 'a25814740@gmail.com',
  phone: '0910-412-606',
  desiredRoles: ['AI 應用開發專員', 'AI 應用工程師', '前端工程師'],
  headline: '我不是只會使用 AI 工具，而是把 AI 變成開發流程的一部分。',
  summary:
    '以前端實戰經驗為基礎，將需求、介面、API 與 AI 工作流整合成可落地的產品功能。',
  facts: ['9~10 年前端與網頁應用開發經驗', 'Vue3 / JavaScript / RWD / API 串接', '後台管理系統與跨部門協作', 'ChatGPT / Codex / Gemini / Antigravity 輔助開發'],
};

export const navItems = [
  { label: '能力亮點', href: '#strengths' },
  { label: 'AI 工作流', href: '#workflow' },
  { label: '經歷', href: '#experience' },
  { label: '技能', href: '#skills' },
  { label: '作品集', href: '#projects' },
];

export const strengths: Strength[] = [
  {
    title: 'Frontend Engineering',
    description: '能把畫面、狀態、RWD 與互動細節整理成穩定可維護的前端介面。',
    tags: ['Vue3', 'JavaScript', 'RWD'],
  },
  {
    title: 'API Integration',
    description: '熟悉表單流程、資料呈現、錯誤狀態與前後端溝通的落地細節。',
    tags: ['Ajax', 'REST API', 'Error State'],
  },
  {
    title: 'Admin Dashboard',
    description: '做過後台管理系統與功能型介面，重視資訊層級與操作效率。',
    tags: ['Dashboard', 'CRUD', 'Data UI'],
  },
  {
    title: 'AI-assisted Development',
    description: '使用 AI 加速開發，但保留人工判斷、實測與品質驗收。',
    tags: ['Codex', 'Gemini', 'Prompt 拆解'],
  },
  {
    title: 'Cross-functional Collaboration',
    description: '能與設計、PM、後端或營運單位釐清需求，降低溝通落差。',
    tags: ['需求釐清', '跨部門', '交付節奏'],
  },
  {
    title: 'Problem Solving',
    description: '面對線上問題會先縮小範圍，再用 DevTools、API 回應與使用情境驗證。',
    tags: ['DevTools', 'Debug', 'Browser 相容'],
  },
];

export const workflowSteps = [
  {
    title: '需求拆解',
    body: '先把需求拆成畫面、資料、權限、錯誤狀態與驗收條件。',
  },
  {
    title: 'Prompt / 任務切分',
    body: '將大問題切成可驗證的小任務，避免一次丟給 AI 後難以判斷品質。',
  },
  {
    title: 'AI 產生初版',
    body: '讓 AI 負責擴大產出速度，例如草擬 component、測試案例或重構方向。',
  },
  {
    title: '人工判斷與修正',
    body: '檢查安全性、效能、可讀性與可維護性，不把未驗證輸出直接當成果。',
  },
  {
    title: '瀏覽器實測 / API 驗證',
    body: '用 Console、Network、RWD viewport 與實際資料確認功能真的可用。',
  },
  {
    title: '文件化與模板化',
    body: '把可重複的 prompt、流程與檢查清單留下來，讓下一次更穩。',
  },
];

export const experiences: Experience[] = [
  {
    period: '2022/7 - 2023/9',
    company: '美星健康科技有限公司',
    role: '前端工程師',
    summary: '負責 HTML5、CSS3、JavaScript、jQuery 與 RWD 相關開發，處理瀏覽器相容性與頁面互動細節。',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'RWD'],
  },
  {
    period: '2021/1 - 2021/11',
    company: '九七科技股份有限公司',
    role: '網頁前端工程師',
    summary: '參與 Vue、Pug、Sass 與 API 串接工作，與跨部門協作並協助處理線上問題。',
    tags: ['Vue', 'Pug', 'Sass', 'API 串接'],
  },
  {
    period: '2020/1 - 2020/11',
    company: '千樂軟體開發有限公司',
    role: '前端網頁工程師',
    summary: '開發後台管理系統與功能型介面，關注 RWD、操作流程與瀏覽器相容性。',
    tags: ['後台管理', '功能介面', 'RWD'],
  },
  {
    period: '2019/5 - 2019/11',
    company: '申樺有限公司',
    role: '前端網頁工程師',
    summary: '使用 HTML5、CSS3、jQuery、Ajax 完成網站套版與 API 串接，具備獨立完成專案經驗。',
    tags: ['jQuery', 'Ajax', '套版', '獨立專案'],
  },
  {
    period: '2018/10 - 2019/3',
    company: '威德網頁設計',
    role: '前端網頁設計師',
    summary: '負責切版、互動效果、RWD 與瀏覽器相容性，支援多類型網站交付。',
    tags: ['切版', '互動效果', 'RWD'],
  },
  {
    period: '2015/9 - 2018/5',
    company: '英創達網路有限公司',
    role: '前端網頁設計師',
    summary: '累積 HTML5、CSS3、jQuery、網站切版、互動特效、RWD 與專案交付基礎。',
    tags: ['HTML5', 'CSS3', 'jQuery', '專案交付'],
  },
  {
    period: '2023/11 - 至今',
    company: '湯村足體養生館 / 人蔘養生館',
    role: '現場服務與使用者觀察',
    summary: '作為職涯補充經驗，強化真實使用者需求理解、現場溝通、流程觀察與臨場問題處理。',
    tags: ['使用者理解', '現場溝通', '流程觀察'],
    secondary: true,
  },
];

export const skillGroups: SkillGroup[] = [
  {
    name: 'Frontend',
    description: '畫面實作、元件拆分與響應式介面。',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Vue.js', 'Pug', 'Sass', 'Bootstrap', 'RWD'],
  },
  {
    name: 'Integration',
    description: '資料串接、流程狀態與使用者操作回饋。',
    skills: ['Ajax', 'API 串接', '資料呈現', '表單流程', '錯誤狀態處理'],
  },
  {
    name: 'AI Workflow',
    description: '用 AI 放大產出速度，再用工程判斷把品質收斂。',
    skills: ['ChatGPT', 'Codex', 'Gemini', 'Antigravity', 'Prompt 拆解', 'Agentic Coding'],
  },
  {
    name: 'Tools',
    description: '日常開發、除錯、版本控制與視覺素材處理。',
    skills: ['VS Code', 'Git', 'GitHub', 'Chrome DevTools', 'Photoshop', 'Illustrator'],
  },
];
