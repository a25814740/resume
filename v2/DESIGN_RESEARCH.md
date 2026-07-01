# v2 設計研究摘要

## 目標產業

- AI 應用開發
- 前端工程
- 網頁應用系統
- MarTech / 社群自動化工具
- 企業內部工具 / 後台管理系統

## 結論

- 色調：暖灰、米白、石墨黑作為閱讀基底，霧藍、低飽和青綠與暖橘作小面積點綴。
- 字體：繁體中文優先使用 `Noto Sans TC`, `PingFang TC`, `Microsoft JhengHei`, system-ui；技術標籤使用系統 sans。
- 版面節奏：首屏 5 秒內交代姓名、定位、職務與核心能力；中段用 Bento Grid 和 sticky timeline 支援快速掃讀；作品集放在全站最後。
- 互動特效：保留首屏 reveal、scroll progress、section reveal、timeline highlight、card hover；手機版簡化位移。
- 避免元素：紫藍霓虹、大量粒子、機器人、發光電路板、過度 3D transform、跑太快的 marquee。

## 設計規範

- Typography：中文行高 1.7~1.9，長段落 max-width 約 720px，標題不拉字距。
- Color tokens：集中於 `src/styles/tokens.css`，以中性色為主，品牌點綴色保持低飽和。
- Spacing system：使用 0.5rem / 0.75rem / 1rem / 1.5rem / 2rem / 3rem / 4.5rem。
- Layout grid：內容最大寬度 1180px，Hero 及專案區可放寬至 1320px；RWD 在 1060px / 760px 斷點切換。
- Component style：卡片圓角 8px 以內，互動元素有 hover 與 focus-visible 狀態。
- Motion principle：動畫只服務閱讀節奏，主要使用 opacity / transform。
- Responsive rule：手機版移除 sticky 依賴，專案卡與時間線改單欄。
- Accessibility rule：語意化 section/header/nav/main，跳到主要內容連結，裝飾 icon 使用 `aria-hidden`，支援 `prefers-reduced-motion`。
