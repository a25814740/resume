export type NavItem = {
  label: string;
  href: string;
};

export type SkillLevel = '實務使用' | '熟悉' | '持續學習' | '可配合開發';

export type SkillGroup = {
  id: string;
  name: string;
  summary: string;
  level: SkillLevel;
  skills: string[];
  detail: string;
};

export type WorkflowNode = {
  id: string;
  title: string;
  tool: string;
  use: string;
  problem: string;
  output: string;
};

export type Experience = {
  period: string;
  company: string;
  role: string;
  summary: string;
  tags: string[];
  mode: 'technical' | 'full';
};

export type ProjectCategory =
  | '全部'
  | '企業網站'
  | '前端切版'
  | '後台系統'
  | 'AI 應用'
  | 'Side Project';

export type Project = {
  id: string;
  name: string;
  group: 'Commercial Website Works' | 'Web System / Admin UI' | 'AI / Automation Side Projects';
  category: Exclude<ProjectCategory, '全部'>;
  type: string;
  role: string;
  stack: string[];
  responsibility: string[];
  background: string;
  challenge: string[];
  solution: string[];
  outcome: string[];
  screenshotChecklist: string[];
  learning: string;
  demoUrl?: string;
  image: string;
  privateNote?: string;
};

export const profile = {
  name: '羅仕林',
  englishName: 'Eden Luo',
  title: 'Frontend Developer × AI Workflow Builder',
  email: 'a25814740@gmail.com',
  location: 'Taichung, Taiwan',
  githubUrl: 'https://github.com/a25814740',
  resume104Url: 'https://www.104.com.tw/',
  pdfUrl: '/Eden-Luo-Resume.pdf',
  headline: '我不是只做畫面，而是把想法、流程與資料，做成可以被使用的網頁工具。',
  summary:
    '9+ 年前端網頁開發經驗，熟悉 RWD、JavaScript、Vue、API 串接與互動介面製作。近年持續導入 ChatGPT、Codex、Gemini、Antigravity 等 AI 工具，將需求拆解、開發流程、自動化工具與 Side Project 整合成可執行的產品。',
};

export const navItems: NavItem[] = [
  { label: '關於', href: '#about' },
  { label: '技能', href: '#skills' },
  { label: 'AI Lab', href: '#workflow' },
  { label: '經歷', href: '#experience' },
  { label: '作品', href: '#projects' },
  { label: '聯絡', href: '#contact' },
];

export const heroFacts = ['9+ 年前端實務', 'Vue / RWD / API', 'AI Coding 工作流', '可落地的網頁工具'];

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    summary: '把設計稿、互動、RWD 與狀態整理成穩定可維護的前端介面。',
    level: '實務使用',
    skills: ['HTML5', 'CSS3 / SCSS', 'JavaScript', 'jQuery', 'Vue.js', 'RWD', 'Bootstrap', 'Browser Compatibility', 'UI Interaction'],
    detail: '長期處理企業網站、活動頁、RWD 切版與互動效果，重視不同裝置上的閱讀節奏與操作手感。',
  },
  {
    id: 'ai-workflow',
    name: 'AI Workflow',
    summary: '用 AI 協助拆需求、寫程式、查錯與整理文件，但保留人工判斷。',
    level: '持續學習',
    skills: ['ChatGPT', 'Codex', 'Gemini', 'Antigravity', 'Prompt Design', 'Vibe Coding', 'AI-assisted Debugging', 'AI-assisted Documentation'],
    detail: '把大需求拆成可驗證的小任務，再用 AI 擴大產出速度，最後回到測試、體驗與可維護性檢查。',
  },
  {
    id: 'web-system',
    name: 'Web System',
    summary: '熟悉資料呈現、表單流程、搜尋篩選與 API 回應狀態。',
    level: '實務使用',
    skills: ['API 串接', '後台管理介面', '表單流程', '資料呈現', '使用者操作流程', '權限 / 狀態邏輯概念'],
    detail: '做過後台與功能型介面，能把資料、錯誤狀態、空狀態與使用者操作流程整理到前端畫面裡。',
  },
  {
    id: 'design-sense',
    name: 'Design Sense',
    summary: '能理解版面、視覺層級、動線與互動，不只是照稿切版。',
    level: '熟悉',
    skills: ['Photoshop', 'Illustrator', '版面設計', '視覺切版', '互動特效', '動線規劃'],
    detail: '過去從網頁設計與切版進入前端，對畫面層級、留白、視覺一致性與內容可讀性有基本判斷。',
  },
  {
    id: 'tools',
    name: 'Tools',
    summary: '支援日常開發、版本管理、部署與輕量自動化。',
    level: '可配合開發',
    skills: ['Git / GitHub', 'VS Code', 'Vercel / Netlify', 'Google Sheets / Apps Script', 'Basic Deployment'],
    detail: '能配合團隊版控與部署流程，也能用試算表、Apps Script 或簡單工具把重複工作流程化。',
  },
];

export const workflowNodes: WorkflowNode[] = [
  {
    id: 'chatgpt',
    title: 'Requirement',
    tool: 'ChatGPT',
    use: '需求分析、功能拆解、文案與文件整理。',
    problem: '把模糊想法轉成畫面、資料、流程、限制與驗收條件。',
    output: '需求摘要、任務列表、UI copy、測試情境。',
  },
  {
    id: 'codex',
    title: 'Coding Agent',
    tool: 'Codex',
    use: '專案閱讀、程式修改、錯誤排查、產出下一步任務。',
    problem: '在既有程式碼中找到可改的位置，降低盲改風險。',
    output: '可執行程式碼、測試結果、變更摘要。',
  },
  {
    id: 'gemini',
    title: 'Research',
    tool: 'Gemini / Antigravity',
    use: '資料研究、方案比較、技術補強與原型探索。',
    problem: '需要快速比較方案或補足未知技術背景時，先縮短研究時間。',
    output: '方案比較、風險整理、原型方向。',
  },
  {
    id: 'human',
    title: 'Human Check',
    tool: '人工判斷',
    use: '確認需求、測試結果、畫面體驗與實際可用性。',
    problem: 'AI 可以加速，但不能替代工程判斷與使用者視角。',
    output: '驗收清單、修正方向、可交付版本。',
  },
];

export const terminalLines = [
  'analyzing requirement...',
  'generating frontend tasks...',
  'checking API flow...',
  'building prototype...',
  'ready for human review.',
];

export const experiences: Experience[] = [
  {
    period: '2024-2026',
    company: 'AI Coding / Side Project / 自動化工具實作',
    role: 'AI Workflow Builder',
    summary: '以 ChatGPT、Codex、Gemini、Antigravity 建立需求拆解、Side Project、文件整理與自動化開發流程。',
    tags: ['ChatGPT', 'Codex', 'Automation', 'Prototype'],
    mode: 'technical',
  },
  {
    period: '2022-2023',
    company: '美星健康科技',
    role: '前端工程師',
    summary: '負責 HTML、CSS、jQuery、JavaScript、RWD 與瀏覽器相容性，維護網站與互動細節。',
    tags: ['HTML', 'CSS', 'JavaScript', 'RWD'],
    mode: 'technical',
  },
  {
    period: '2021',
    company: '九七科技',
    role: '前端網頁工程師',
    summary: '參與 Vue、Pug、Sass、API 串接與前端團隊合作，並即時處理線上問題。',
    tags: ['Vue', 'Pug', 'Sass', 'API'],
    mode: 'technical',
  },
  {
    period: '2020',
    company: '千樂軟體開發',
    role: '前端網頁工程師',
    summary: '製作後台管理系統、網站切版、套版、特效與互動設計。',
    tags: ['Admin UI', 'Interaction', 'RWD'],
    mode: 'technical',
  },
  {
    period: '2019',
    company: '申樺有限公司',
    role: '前端網頁工程師',
    summary: '使用 HTML、CSS、jQuery、Ajax 與 API 概念，獨立完成網站專案。',
    tags: ['jQuery', 'Ajax', 'API'],
    mode: 'technical',
  },
  {
    period: '2018-2019',
    company: '威德網頁設計',
    role: '前端網頁設計師',
    summary: '負責 RWD、獨立專案、互動效果與切版品質。',
    tags: ['RWD', 'Layout', 'Effects'],
    mode: 'technical',
  },
  {
    period: '2015-2018',
    company: '英創達網路有限公司',
    role: '前端網頁設計師',
    summary: '累積 HTML、CSS、jQuery、RWD、企業網站切版與瀏覽器相容經驗。',
    tags: ['HTML', 'CSS', 'jQuery', 'Browser'],
    mode: 'technical',
  },
  {
    period: '2023-2026',
    company: '第一線服務與使用者觀察',
    role: '服務流程與客戶溝通',
    summary: '補充真實場域中的需求理解、客戶溝通與流程觀察能力，協助思考產品是否真的好用。',
    tags: ['User Insight', 'Communication', 'Service Flow'],
    mode: 'full',
  },
  {
    period: '2015',
    company: '臺中科技大學',
    role: '資訊管理系畢業',
    summary: '建立資訊管理、網站製作與系統思維基礎。',
    tags: ['Information Management'],
    mode: 'full',
  },
];

export const projectCategories: ProjectCategory[] = ['全部', '企業網站', '前端切版', '後台系統', 'AI 應用', 'Side Project'];

export const projects: Project[] = [
  {
    id: 'grapeking',
    name: '葡萄王生技股份有限公司',
    group: 'Commercial Website Works',
    category: '企業網站',
    type: '企業形象網站',
    role: '前端切版與互動實作',
    stack: ['HTML', 'CSS', 'jQuery', 'RWD'],
    responsibility: ['RWD 版面製作', '跨瀏覽器調整', '互動效果整合', '上線前畫面檢查'],
    background: '企業網站需要清楚呈現品牌、產品資訊與多裝置瀏覽體驗。',
    challenge: [
      '企業內容量較大，需要在品牌形象、產品資訊與導覽效率之間取得平衡。',
      '舊型企業網站常需要兼顧不同瀏覽器與不同尺寸裝置，不能只看桌機版漂亮。',
      '頁面區塊多，若切版規則不穩，後續維護與內容替換會很容易跑版。',
    ],
    solution: [
      '以可重複的版面區塊整理內容層級，讓標題、圖片、段落與 CTA 保持一致節奏。',
      '針對桌機、平板、手機逐段檢查 RWD，調整圖片比例、欄位堆疊與文字間距。',
      '整合 jQuery 互動時控制效果密度，優先確保資訊可讀與操作穩定。',
    ],
    outcome: [
      '完成可公開瀏覽的企業形象網站前端頁面，讓品牌與產品資訊能在多裝置上呈現。',
      '累積大型企業網站切版、瀏覽器相容與上線前檢查經驗。',
      '建立後續商業網站專案可沿用的 RWD 與區塊化切版判斷。',
    ],
    screenshotChecklist: ['首頁首屏與主視覺', '產品或品牌介紹區塊', '手機版導覽與內容堆疊', '互動元件狀態'],
    learning: '商業網站的重點不是特效多，而是資訊層級、品牌一致性與穩定交付。',
    demoUrl: 'https://www.grapeking.com.tw/tw/',
    image: '/assets/logo/logo1.png',
  },
  {
    id: 'repongroup',
    name: '南俊國際股份有限公司',
    group: 'Commercial Website Works',
    category: '企業網站',
    type: '企業網站 / 產品資訊',
    role: '前端網頁設計師',
    stack: ['HTML', 'CSS', 'Bootstrap', 'jQuery'],
    responsibility: ['版面切版', 'RWD 調整', '內容區塊整理', '瀏覽器相容測試'],
    background: '將公司品牌與產品線整理成可瀏覽、可維護的網站介面。',
    challenge: [
      '產品與公司資訊需要清楚分類，避免訪客進站後找不到重點。',
      '企業網站通常有多層頁面與固定版型，切版需要兼顧一致性與彈性。',
      'Bootstrap 能加快開發，但也容易讓畫面變得制式，需要搭配客製 CSS 修正品牌感。',
    ],
    solution: [
      '以 Bootstrap grid 作為基礎，再針對內容密度、圖片比例與間距做客製調整。',
      '把共用區塊維持一致規則，降低不同頁面之間的視覺落差。',
      '用前端檢查流程確認桌機與手機版的資訊排序、連結狀態與瀏覽器相容性。',
    ],
    outcome: [
      '交付企業網站前端頁面，支援品牌介紹與產品資訊呈現。',
      '強化在既有框架下做客製化切版與 RWD 調整的能力。',
      '讓面試官能看到我不是只會套 Bootstrap，而是能把框架轉成符合內容需求的頁面。',
    ],
    screenshotChecklist: ['首頁品牌區塊', '產品列表或產品介紹頁', '頁首導覽展開狀態', '手機版內容排序'],
    learning: '大量內容型網站需要穩定的元件規則，否則後續維護會很辛苦。',
    demoUrl: 'https://www.repongroup.com/tw/',
    image: '/assets/logo/logo3.jpg',
  },
  {
    id: 'yudah',
    name: '育達高職科系網站群',
    group: 'Commercial Website Works',
    category: '前端切版',
    type: '學校科系網站',
    role: '前端切版與頁面製作',
    stack: ['HTML', 'CSS', 'jQuery', 'RWD'],
    responsibility: ['共用視覺架構製作', '多頁面切版', '手機版調整', '科系內容呈現'],
    background: '多個科系網站需要在共同框架下保留各自內容特色。',
    challenge: [
      '同一組網站群需要維持共同識別，但不同科系又有不同內容重點。',
      '多頁面結構若沒有共用規則，後續調整會造成大量重工。',
      '學校網站使用者包含學生、家長與行政端，資訊掃讀效率比視覺花俏更重要。',
    ],
    solution: [
      '整理共用版型規則，讓不同科系頁面可以套用一致的標題、卡片、內容區與導覽結構。',
      '用 RWD 方式調整招生資訊、介紹段落與圖片在手機上的閱讀順序。',
      '保留必要互動效果，但避免影響內容瀏覽與低效能裝置的載入體驗。',
    ],
    outcome: [
      '完成多個科系頁面的前端製作，讓網站群維持一致體驗。',
      '累積多頁面切版、共用結構規劃與內容型網站維護思維。',
      '這類專案成為後續理解元件化與 Vue component 拆分的基礎。',
    ],
    screenshotChecklist: ['科系首頁首屏', '課程或特色介紹區塊', '共用導覽與頁尾', '手機版招生資訊區'],
    learning: '重複類型頁面適合用元件化思維管理，這也是後來轉向 Vue 的重要基礎。',
    demoUrl: 'http://web3.yudah.tp.edu.tw/model',
    image: '/assets/logo/logo4.png',
  },
  {
    id: 'eighteen-ranch',
    name: '十八養場',
    group: 'Commercial Website Works',
    category: '企業網站',
    type: '品牌網站',
    role: '前端互動與 RWD 製作',
    stack: ['HTML', 'SCSS', 'jQuery', 'RWD'],
    responsibility: ['品牌頁切版', '響應式調整', '互動狀態', '頁面效能檢查'],
    background: '品牌網站需要兼顧視覺記憶點與基本資訊搜尋效率。',
    challenge: [
      '品牌網站需要有視覺記憶點，但不能讓動畫或圖片影響資訊取得。',
      '圖片與品牌素材比例不同，RWD 時容易造成裁切不自然或版面重心偏移。',
      '互動效果需要讓頁面更順，不是把每個區塊都加特效，這點很考驗克制。',
    ],
    solution: [
      '使用 SCSS 管理樣式層級，讓品牌色、間距與狀態樣式保持一致。',
      '針對不同 viewport 檢查圖片容器、段落寬度與 CTA 位置，讓內容在手機也好讀。',
      '把互動效果集中在導覽、按鈕與重點區塊，降低無意義動畫造成的干擾。',
    ],
    outcome: [
      '完成品牌網站前端製作，兼顧視覺呈現與基礎資訊導覽。',
      '累積品牌型網站在圖片、互動與 RWD 之間取捨的實務經驗。',
      '讓作品集能展示我對「畫面漂亮」與「真的可用」之間平衡的判斷。',
    ],
    screenshotChecklist: ['首頁品牌視覺', '產品或品牌故事區塊', 'CTA hover 狀態', '手機版首屏與導覽'],
    learning: '視覺氛圍可以吸引人，但最終還是要讓使用者找到資訊。',
    demoUrl: 'https://www.18ranch.com.tw/',
    image: '/assets/logo/logo9.png',
  },
  {
    id: 'admin-ui',
    name: '商業後台管理介面',
    group: 'Web System / Admin UI',
    category: '後台系統',
    type: '非公開商業專案',
    role: '前端工程師',
    stack: ['Vue', 'JavaScript', 'API', 'Form UI'],
    responsibility: ['列表資料呈現', '搜尋篩選流程', '表單驗證', 'API 回應狀態處理', '使用者操作流程整理'],
    background: '後台介面不一定公開，但通常最能看出前端工程師對資料與流程的掌握。',
    challenge: [
      '後台系統重點不是視覺裝飾，而是讓使用者能快速查找、編輯、送出與確認狀態。',
      '資料列表、搜尋、表單驗證與 API 錯誤狀態如果沒有整理好，使用者會不知道目前發生什麼事。',
      '商業內部系統通常無法公開畫面，需要在作品集中用可理解的方式說明能力範圍。',
    ],
    solution: [
      '把列表、篩選、表單、空狀態、錯誤狀態與成功回饋拆成可描述的操作流程。',
      '以 Vue 與 JavaScript 管理前端狀態，讓 API 回應能反映到畫面提示與操作限制。',
      '在作品集 Modal 中改用 Case Study 方式呈現，不揭露商業資料也能說清楚負責內容。',
    ],
    outcome: [
      '建立功能型介面的開發經驗，包含 CRUD 類流程、資料呈現與表單互動。',
      '能向面試官說明自己對後台 UI、API 狀態與使用者流程的理解。',
      '讓非公開作品不再只是空白，而是轉化成可被評估的工程能力證明。',
    ],
    screenshotChecklist: ['列表頁與欄位狀態', '搜尋篩選操作', '新增或編輯表單', '錯誤 / 空狀態 / 成功提示'],
    learning: '功能型介面的價值在於降低操作成本，空狀態、錯誤狀態與資料狀態都不能漏。',
    image: '/assets/screenshots/legacy-bg.jpeg',
    privateNote: '此類專案多為任職期間內部系統，網站內以能力說明呈現，不公開原始畫面。',
  },
  {
    id: 'ai-content-tool',
    name: 'AI 社群內容產生工具 Prototype',
    group: 'AI / Automation Side Projects',
    category: 'AI 應用',
    type: 'AI Content Tool',
    role: '產品流程與前端原型規劃',
    stack: ['Prompt Flow', 'Vue', 'Content Ops', 'Automation'],
    responsibility: ['需求拆解', '產文流程規劃', '草稿狀態設計', '內容輸出格式整理'],
    background: '把社群貼文、短影音腳本與草稿管理整理成可操作的 AI 輔助流程。',
    challenge: [
      'AI 產文如果只停在聊天視窗，很難變成團隊可重複使用的內容流程。',
      '社群內容需要經過主題、草稿、修改、審核與輸出格式整理，不能只看單次產出。',
      'Side Project 初期素材與功能會不完整，需要先把產品邏輯說清楚。',
    ],
    solution: [
      '將內容生成流程拆成需求輸入、AI 草稿、人工修正、版本保存與輸出格式。',
      '用前端原型方式設計草稿列表、狀態標籤、內容欄位與操作節點。',
      '整理 Prompt Flow 與 Content Ops 概念，讓工具不是一次性 prompt，而是可延伸產品。',
    ],
    outcome: [
      '形成 AI 社群內容工具的產品雛形，可作為後續 Side Project 開發基礎。',
      '展示我能把 AI 使用經驗轉成介面流程與產品功能，而不是只會問 AI。',
      '讓作品集補上 AI 應用與前端產品思維的連結。',
    ],
    screenshotChecklist: ['需求輸入表單', 'AI 草稿產出畫面', '草稿列表與狀態標籤', '輸出格式或複製結果區'],
    learning: 'AI 工具不只是輸入 prompt，還要設計前後步驟、人工審核點與輸出格式。',
    image: '/assets/screenshots/legacy-bg.jpeg',
    privateNote: 'Prototype 持續整理中，後續可補實際畫面與 demo。',
  },
  {
    id: 'automation-flow',
    name: 'IG / Threads 自動化流程規劃',
    group: 'AI / Automation Side Projects',
    category: 'Side Project',
    type: 'Automation Flow',
    role: '流程設計與工具研究',
    stack: ['Meta API', 'Workflow', 'Google Sheets', 'Apps Script'],
    responsibility: ['留言關鍵字流程', '自動回覆情境', '資料欄位規劃', '替代工具比較'],
    background: '研究如何把社群互動、名單整理與內容流程自動化，降低人工重複操作。',
    challenge: [
      '社群自動化牽涉平台限制、權限、觸發條件、訊息內容與名單紀錄，不是單一按鈕就能解決。',
      'IG / Threads 情境需要考慮留言關鍵字、自動回覆、人工接手與資料保存。',
      '若使用第三方工具成本或彈性不足，就需要評估 Google Sheets / Apps Script 等替代流程。',
    ],
    solution: [
      '先用流程圖拆解觸發條件、資料欄位、回覆內容、人工確認與例外情境。',
      '規劃 Google Sheets 作為輕量資料紀錄中心，搭配 Apps Script 思考自動化可行性。',
      '比較 ManyChat 類工具與自建流程的成本、限制與維護負擔。',
    ],
    outcome: [
      '整理出社群自動化流程的初步架構，能協助後續決定要用工具、API 或自建方案。',
      '累積從營運需求反推資料欄位與自動化節點的能力。',
      '讓作品集呈現我不只做前端頁面，也能思考流程、資料與工具整合。',
    ],
    screenshotChecklist: ['自動化流程圖', 'Google Sheets 欄位規劃', '關鍵字回覆情境表', '工具比較表'],
    learning: '自動化真正的難點常在例外處理、平台限制與資料紀錄。',
    image: '/assets/screenshots/legacy-bg.jpeg',
  },
  {
    id: 'codex-antigravity',
    name: 'Codex + Antigravity 自動化開發流程',
    group: 'AI / Automation Side Projects',
    category: 'AI 應用',
    type: 'AI Coding Workflow',
    role: '開發流程設計',
    stack: ['Codex', 'Antigravity', 'Gemini', 'Git'],
    responsibility: ['任務拆解', '程式碼審查', '錯誤排查', '文件整理', '下一步任務規劃'],
    background: '將 AI Coding 工具導入日常開發，讓需求、修改、測試與紀錄形成一條可追蹤流程。',
    challenge: [
      'AI Coding 很容易變成「看起來快」，但如果沒有任務切分、版本控制與測試，風險也會一起放大。',
      '不同工具適合的工作不同，需要知道何時用 ChatGPT、Codex、Gemini 或 Antigravity。',
      'AI 輸出的程式碼仍需人工檢查安全性、效能、可讀性與可維護性。',
    ],
    solution: [
      '把需求拆成可驗收的小任務，先定義輸入、輸出、檔案範圍與測試方式。',
      '使用 Codex 讀專案、改程式與跑驗證，再用人工檢查 UI、流程與最終品質。',
      '把可重複流程整理成 prompt、檢查清單與下一步任務，降低每次重開專案的成本。',
    ],
    outcome: [
      '形成一套可落地的 AI-assisted development 工作流，能用在履歷網站與 Side Project 開發。',
      '展示我能把 AI 當成工程流程的一部分，而不是把未驗證輸出直接貼上線。',
      '讓面試官理解我目前往 AI 應用、AI Coding 與自動化工具方向發展的具體方式。',
    ],
    screenshotChecklist: ['Codex 任務拆解畫面', 'Git diff / 測試結果', 'AI 工具分工流程圖', '開發檢查清單'],
    learning: 'AI 能加速，但要靠版本控制、測試與清楚驗收標準把品質守住。',
    image: '/assets/screenshots/legacy-bg.jpeg',
  },
];

export const certificates = [
  '丙級網頁設計技術士',
  '丙級電腦軟體設計技術士',
  'Adobe Certified Dreamweaver Developer',
  'Adobe Certified Photoshop',
];

export function filterProjects(category: ProjectCategory, source: Project[] = projects) {
  if (category === '全部') {
    return source;
  }

  return source.filter((project) => project.category === category);
}
