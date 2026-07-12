# V3 Design Research

## 目標定位

V3 重新從舊履歷網站內容出發，不沿用 v1/v2 的視覺版型。目標是呈現「AI 應用落地型工程師」：有前端實務、懂 API 與後台流程，也能把 AI 工具放進可驗證的開發流程。

## 設計研究結論

- 色調：深石墨底，不使用純黑；以低飽和霧青綠處理狀態感，暖橘作為行動與重點提示，避開紫藍霓虹與 AI SaaS 模板感。
- 字體方向：繁體中文優先使用 Noto Sans TC / PingFang TC / Microsoft JhengHei fallback；技術文字使用系統 sans，不用過度花俏或不適合中文的展示字體。
- 版面節奏：首屏先說清楚姓名、職稱、年資與 AI 工作流定位；中段用 Bento 與 sticky timeline 提高掃讀效率；作品集放在最下方。
- 互動特效：首屏 1.2 秒內 reveal、頂部 scroll progress、section reveal、卡片 hover、timeline scroll highlight、技能 tabs。所有動畫支援 prefers-reduced-motion。
- 避免元素：大量粒子、發光電路板、機器人圖像、紫藍漸層、過量 3D transform、跑太快的 marquee、假作品連結。

## Design Tokens

- Typography：中文行高 1.78 起，長文寬度控制在 65~75ch；標題使用 `clamp()`，字距不過度壓縮。
- Color：全部以 OKLCH tokens 管理，背景、surface、ink、muted、primary、accent 分層。
- Spacing：使用 4px / 8px / 12px / 16px / 24px / 32px / 48px / 72px / 96px 節奏。
- Layout：container max 1180px；Bento 使用 6 欄桌機、2 欄平板、1 欄手機；timeline 桌機 sticky、手機線性化。
- Components：卡片半徑不超過 16px，避免大陰影與玻璃擬態；按鈕使用清楚 hover / focus 狀態。
- Motion：動畫只服務閱讀與狀態理解；手機降低位移，reduced motion 關閉大部分動畫。
- Accessibility：semantic section、address、nav、focus-visible、足夠 touch target、disabled project CTA 不填假連結。
