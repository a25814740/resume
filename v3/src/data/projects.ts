export type Project = {
  name: string;
  type: string;
  role: string;
  problem: string;
  stack: string[];
  status: 'coming-soon' | 'available';
  href?: string;
};

export const projects: Project[] = [
  {
    name: 'InboxPilot / IG 自動回覆工具',
    type: 'Social Automation / SaaS Dashboard',
    role: '前端流程設計與產品雛形規劃',
    problem: '協助品牌把留言關鍵字、自動私訊、帳號連接與後台管理整理成可操作流程。',
    stack: ['Vue3', 'Meta API', 'Dashboard', 'Automation'],
    status: 'coming-soon',
  },
  {
    name: 'Digital Marketing AI Platform',
    type: 'AI Marketing Platform',
    role: '產品介面與後台功能規劃',
    problem: '整合 AI 工具、會員、付款、授權、分潤與管理後台，降低行銷工具切換成本。',
    stack: ['AI Tools', 'Member Flow', 'Payment', 'Admin'],
    status: 'coming-soon',
  },
  {
    name: 'Threads / 短影音 AI 內容工具',
    type: 'AI Content Tool',
    role: '內容流程與草稿管理介面',
    problem: '將 AI 產文、短影音腳本、草稿管理與發布流程拆成可追蹤的工作節點。',
    stack: ['Prompt Flow', 'Draft UI', 'Content Ops'],
    status: 'coming-soon',
  },
  {
    name: 'Mobile Codex Workflow',
    type: 'AI Workflow Tool',
    role: '工作流產品化構想與介面設計',
    problem: '把 Codex 遠端工作流整理成 prompt、任務、狀態與成果管理的行動操作模式。',
    stack: ['Codex', 'Task Flow', 'Mobile UI'],
    status: 'coming-soon',
  },
  {
    name: 'Vue / Frontend Practice',
    type: 'Frontend Practice',
    role: '前端架構練習與元件化實作',
    problem: '整理 Vue、元件化、狀態管理、RWD 與前端架構練習，作為技術能力展示。',
    stack: ['Vue', 'Components', 'RWD', 'State'],
    status: 'coming-soon',
  },
];
