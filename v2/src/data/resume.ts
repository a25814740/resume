export const profile = {
  name: '羅仕林',
  englishName: 'Eden Lo',
  title: 'AI 應用開發專員 / 前端工程師',
  headline: 'AI 應用落地型工程師',
  experience: '9~10 年前端與網頁應用開發經驗',
  education: '國立臺中科技大學 資訊管理系',
  location: '台中市',
  email: 'a25814740@gmail.com',
  phone: '0910-412-606',
  roles: ['AI 應用開發專員', 'AI 應用工程師', '前端工程師'],
  heroLead:
    '我不是只會使用 AI 工具，而是把 AI 變成開發流程的一部分。',
  heroBody:
    '以前端實戰經驗為基礎，將需求、介面、API 與 AI 工作流整合成可落地的產品功能。',
  about:
    '畢業於國立臺中科技大學資訊管理系，具備 9~10 年前端與網頁應用開發經驗。過去做過網站切版、RWD、API 串接、後台管理系統、跨部門合作與線上問題處理；近期將 ChatGPT / Codex、Gemini / Antigravity 納入日常開發流程。我的定位不是純模型研究，而是能把需求拆成畫面、資料、流程與可驗證功能的 AI 應用落地型工程師。',
};

export const navItems = [
  { href: '#about', label: '關於' },
  { href: '#strengths', label: '能力' },
  { href: '#workflow', label: '工作流' },
  { href: '#experience', label: '經歷' },
  { href: '#skills', label: '技能' },
  { href: '#projects', label: '作品集' },
];

export const designResearch = [
  {
    title: '色調',
    body: '以暖灰、米白、石墨黑作為閱讀底色，搭配霧藍、低飽和青綠與暖橘小面積點綴，避免紫藍霓虹與 AI SaaS 模板感。',
  },
  {
    title: '字體方向',
    body: '繁體中文採 Noto Sans TC / PingFang TC / 微軟正黑體 fallback，英文與技術字用 system-ui；行高維持 1.7~1.9。',
  },
  {
    title: '版面節奏',
    body: '首屏先講清楚人選定位，中段用 Bento 與 sticky timeline 提高掃讀效率，作品集收在最下方做收束。',
  },
  {
    title: '互動特效',
    body: '保留首屏 reveal、scroll progress、section reveal、timeline highlight 與 hover micro-interaction，不做大量粒子與 3D 轉場。',
  },
];

export const strengths = [
  {
    title: 'Frontend Engineering',
    description: '能把設計與需求拆成穩定、可維護的 HTML / CSS / JavaScript / Vue 介面。',
    keywords: ['Vue3', 'JavaScript', 'RWD'],
  },
  {
    title: 'API Integration',
    description: '熟悉 Ajax、API 串接、資料呈現、表單流程與錯誤狀態處理。',
    keywords: ['Ajax', 'API', 'Error State'],
  },
  {
    title: 'Admin Dashboard',
    description: '做過後台管理與功能型介面，理解資料列表、操作流程與狀態回饋。',
    keywords: ['Admin UI', 'Workflow', 'Data UI'],
  },
  {
    title: 'AI-assisted Development',
    description: '使用 ChatGPT / Codex、Gemini / Antigravity 拆需求、產初版、查錯與重構。',
    keywords: ['Codex', 'Gemini', 'Prompt'],
  },
  {
    title: 'Cross-functional Collaboration',
    description: '能與設計、企劃、工程溝通，把模糊需求整理成可以交付的前端任務。',
    keywords: ['Spec', 'Handoff', 'QA'],
  },
  {
    title: 'Problem Solving',
    description: '處理過線上問題、瀏覽器相容性與臨場需求，重視驗證後再交付。',
    keywords: ['Debug', 'DevTools', 'Verify'],
  },
];

export const workflow = [
  {
    title: '需求拆解',
    body: '先釐清畫面、資料、流程與例外情境，避免 AI 直接朝錯方向狂奔。',
  },
  {
    title: 'Prompt / 任務切分',
    body: '把任務拆成小段，讓 AI 產出更容易驗證，也比較不會變成一鍋粥。',
  },
  {
    title: 'AI 產生初版',
    body: '用 Codex / ChatGPT / Gemini 產出元件、樣式、API 流程或測試雛形。',
  },
  {
    title: '人工判斷與修正',
    body: '由我確認方向、調整互動細節、整理命名與重構可維護性。',
  },
  {
    title: '瀏覽器實測 / API 驗證',
    body: '用 DevTools、Console、狀態畫面與實際資料確認功能沒有只停在 demo。',
  },
  {
    title: '文件化與模板化',
    body: '把可重複的流程整理成 prompt、檢查表或元件模式，讓下次更快更穩。',
  },
];

export const experiences = [
  {
    period: '2022/7 - 2023/9',
    company: '美星健康科技有限公司',
    role: '前端工程師',
    points: ['HTML5 / CSS3 / JavaScript / jQuery', 'RWD 響應式調整', 'Browser 相容性處理'],
  },
  {
    period: '2021/1 - 2021/11',
    company: '九七科技股份有限公司',
    role: '網頁前端工程師',
    points: ['Vue / Pug / Sass 開發', 'API 串接與資料呈現', '跨部門合作與線上問題處理'],
  },
  {
    period: '2020/1 - 2020/11',
    company: '千樂軟體開發有限公司',
    role: '前端網頁工程師',
    points: ['後台管理系統', '功能型介面開發', 'RWD 與瀏覽器相容性'],
  },
  {
    period: '2019/5 - 2019/11',
    company: '申樺有限公司',
    role: '前端網頁工程師',
    points: ['HTML5 / CSS3 / jQuery / Ajax', 'API 串接與套版', '獨立完成專案'],
  },
  {
    period: '2018/10 - 2019/3',
    company: '威德網頁設計',
    role: '前端網頁設計師',
    points: ['切版與互動效果', 'RWD', '瀏覽器相容性與專案交付'],
  },
  {
    period: '2015/9 - 2018/5',
    company: '英創達網路有限公司',
    role: '前端網頁設計師',
    points: ['HTML5 / CSS3 / jQuery', '網站切版與互動特效', '客戶型網站交付'],
  },
  {
    period: '2023/11 - 至今',
    company: '湯村足體養生館 / 人蔘養生館',
    role: '服務現場與使用者觀察',
    points: ['使用者需求理解', '現場溝通', '服務流程觀察與臨場問題處理'],
    supporting: true,
  },
];

export const skillGroups = [
  {
    title: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Vue.js', 'Pug', 'Sass', 'Bootstrap', 'RWD'],
  },
  {
    title: 'Integration',
    skills: ['Ajax', 'API 串接', '資料呈現', '表單流程', '錯誤狀態處理'],
  },
  {
    title: 'AI Workflow',
    skills: ['ChatGPT', 'Codex', 'Gemini', 'Antigravity', 'Prompt 拆解', 'Agentic Coding'],
  },
  {
    title: 'Tools',
    skills: ['VS Code', 'Git', 'GitHub', 'Chrome DevTools', 'Photoshop', 'Illustrator'],
  },
];
