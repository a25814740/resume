export type WorkTheme = {
  background: string
  surface: string
  text: string
  mutedText: string
  accent: string
  overlay: string
  headerBackground: string
}

export type Work = {
  id: string
  slug: string
  title: string
  category: string
  description: string
  coverImage: string
  listImage?: string
  galleryImages: string[]
  link: string
  tech: string[]
  theme: WorkTheme
}

const screenshots = {
  mtr: '/images/projects/mtr-full.webp',
  grapeking: '/images/projects/grapeking-full.webp',
  repon: '/images/projects/repon-full.webp',
  yudahModel: '/images/projects/yudah-model-full.webp',
  yudahArt: '/images/projects/yudah-art-full.webp',
  yudahRm: '/images/projects/yudah-rm-full.webp',
  longnew: '/images/projects/longnew-full.webp',
  biipDcc: '/images/projects/biip-dcc-full.webp',
  aaady: '/images/projects/aaady-full.webp',
  uneec: '/images/projects/uneec-full.webp',
  blairsfilm: '/images/projects/blairsfilm-full.webp',
  ranch18: '/images/projects/18ranch-full.webp',
  grobest: '/images/projects/grobest-full.webp',
}

export const works: Work[] = [
  {
    id: 'mtr', slug: 'wooden-man', title: '木頭人', category: 'WEB DESIGN',
    description: '以木頭人路由器為核心，整理產品特色、最新產品與 VPN 使用說明，透過清楚的單頁節奏建立簡潔、容易閱讀的產品網站。',
    coverImage: screenshots.mtr, listImage: '/images/projects/mtr-banner.png', galleryImages: [screenshots.mtr], link: 'https://chestnutcat.xsrv.jp/download/mtr/demo/site/', tech: ['Frontend', 'jQuery', 'RWD'],
    theme: { background: '#21382f', surface: '#e9efe6', text: '#edf5e7', mutedText: '#c0d0c2', accent: '#d4ff68', overlay: '#17271f', headerBackground: '#1b2e26' },
  },
  {
    id: 'grapeking', slug: 'grape-king', title: '葡萄王生技', category: 'CORPORATE SITE',
    description: '以「健康專家、照顧全家」為核心，整合企業資訊、產品研發、專業代工與 ESG 內容，建立兼顧品牌形象與資訊查找效率的企業入口。',
    coverImage: screenshots.grapeking, listImage: '/images/projects/grapeking-banner.png', galleryImages: [screenshots.grapeking], link: 'https://www.grapeking.com.tw/', tech: ['Frontend', 'CMS', 'RWD'],
    theme: { background: '#40234b', surface: '#f7f0f3', text: '#fff5fb', mutedText: '#e5cde0', accent: '#ffb3dc', overlay: '#301a38', headerBackground: '#351c3e' },
  },
  {
    id: 'repon', slug: 'repon-group', title: '南俊國際', category: 'CORPORATE SITE',
    description: '聚焦工業、家電、廚房、辦公家具與伺服器導軌等應用，將產品、展覽與服務資訊整理為清楚的 B2B 企業網站。',
    coverImage: screenshots.repon, listImage: '/images/projects/repon-banner.png', galleryImages: [screenshots.repon], link: 'https://repon.com.tw/tw/', tech: ['Frontend', 'jQuery', 'RWD'],
    theme: { background: '#14364a', surface: '#eef5f7', text: '#edf8fb', mutedText: '#bdd8e1', accent: '#71e5ff', overlay: '#0f2939', headerBackground: '#112f40' },
  },
  {
    id: 'yudah-model', slug: 'yudah-fashion-model', title: '育達高職 時尚模特兒科', category: 'SCHOOL SITE',
    description: '以時尚模特兒科的走秀、舞台表演與整體造型課程為主軸，透過大幅形象影像與分區內容，呈現科系特色、專業設備與學生展演成果。',
    coverImage: screenshots.yudahModel, listImage: '/images/projects/yudah-model-banner.png', galleryImages: [screenshots.yudahModel], link: 'https://web.archive.org/web/20181217221914/http://web3.yudah.tp.edu.tw/model', tech: ['Frontend', 'jQuery', 'RWD'],
    theme: { background: '#4a233e', surface: '#f8edf4', text: '#fff3fa', mutedText: '#e8c6dc', accent: '#ff81bf', overlay: '#35182d', headerBackground: '#3f1d35' },
  },
  {
    id: 'yudah-art', slug: 'yudah-performing-arts', title: '育達高職 表演藝術科', category: 'SCHOOL SITE',
    description: '聚焦綜藝、舞蹈與戲劇人才培育，整合課程規劃、師資陣容、專業設備和演出作品，以鮮明舞台視覺建立充滿動感的科系形象。',
    coverImage: screenshots.yudahArt, listImage: '/images/projects/yudah-art-banner.png', galleryImages: [screenshots.yudahArt], link: 'https://web3.yudah.tp.edu.tw/art', tech: ['Frontend', 'jQuery', 'RWD'],
    theme: { background: '#3d2355', surface: '#f3edf9', text: '#faf2ff', mutedText: '#d8c7e7', accent: '#c78cff', overlay: '#2c193e', headerBackground: '#351e4a' },
  },
  {
    id: 'yudah-rm', slug: 'yudah-restaurant-management', title: '育達高職 餐飲管理科', category: 'SCHOOL SITE',
    description: '以餐飲管理、特色廚藝與產學合作為核心，呈現三廚加美學的教學理念，並串連專業設備、競賽成果與實習資源。',
    coverImage: screenshots.yudahRm, listImage: '/images/projects/yudah-rm-banner.png', galleryImages: [screenshots.yudahRm], link: 'https://web3.yudah.tp.edu.tw/rm', tech: ['Frontend', 'jQuery', 'RWD'],
    theme: { background: '#5a2e1d', surface: '#fff2e8', text: '#fff4ed', mutedText: '#eccbbb', accent: '#ffb56f', overlay: '#412116', headerBackground: '#4d2719' },
  },
  {
    id: 'longnew', slug: 'long-new', title: '久馨股份', category: 'BRAND SITE',
    description: '呈現智能印刷、精密塗佈與軟包裝設備，以客製化解決方案、整合服務與國際技術合作，傳達製程升級與智慧製造能力。',
    coverImage: screenshots.longnew, galleryImages: [screenshots.longnew], link: 'https://www.long-new.com/?lang=tw', tech: ['Frontend', 'CSS Animation'],
    theme: { background: '#6a3128', surface: '#fff3e8', text: '#fff4ed', mutedText: '#f0c9bb', accent: '#ffcf67', overlay: '#4e241e', headerBackground: '#592a23' },
  },
  {
    id: 'biip-dcc', slug: 'biomedical-commercialization-center', title: 'DCC 藥品商品化中心', category: 'BIOTECH PLATFORM',
    description: '協助生醫與藥物研發團隊跨越商品化過程中的技術與市場門檻，整合潛力案源、專業輔導、產業資訊及國際鏈結。',
    coverImage: screenshots.biipDcc, galleryImages: [screenshots.biipDcc], link: 'https://www.biip-dcc.org/', tech: ['Frontend', 'CMS', 'RWD'],
    theme: { background: '#0f5962', surface: '#eaf6f5', text: '#edffff', mutedText: '#bfe0df', accent: '#ffc35b', overlay: '#0a4148', headerBackground: '#0d4d55' },
  },
  {
    id: 'aaady', slug: 'aaady-apparel', title: '大洋製衣', category: 'CORPORATE SITE',
    description: '呈現成衣、羽絨寢具與睡袋的製造能力，從原料、產品到 ODM／OEM 服務，建立兼具專業感與生活情境的製造業品牌網站。',
    coverImage: screenshots.aaady, galleryImages: [screenshots.aaady], link: 'https://www.aaady.com.tw/', tech: ['Frontend', 'jQuery', 'RWD'],
    theme: { background: '#18345d', surface: '#eef3f9', text: '#f3f7ff', mutedText: '#c5d2e7', accent: '#72d5e3', overlay: '#112643', headerBackground: '#152e51' },
  },
  {
    id: 'uneec', slug: 'uneec-electronics', title: '晟銘電子科技', category: 'CORPORATE SITE',
    description: '以伺服器機構、金屬零件、電源與散熱模組為主體，整合研發設計、製造能力、全球據點及投資人資訊。',
    coverImage: screenshots.uneec, galleryImages: [screenshots.uneec], link: 'https://www.uneec.com/', tech: ['Frontend', 'jQuery', 'RWD'],
    theme: { background: '#263d54', surface: '#edf2f6', text: '#f3f8fc', mutedText: '#c1ced9', accent: '#6ec9e6', overlay: '#1b2c3d', headerBackground: '#22374a' },
  },
  {
    id: 'blairsfilm', slug: 'blairs-wedding-film', title: '布萊爾專業錄影團隊', category: 'CREATIVE STUDIO',
    description: '以婚禮錄影、快剪快播與海外婚禮為核心，透過大幅影像作品、服務方案與流程說明，呈現團隊的敘事風格和製作能力。',
    coverImage: screenshots.blairsfilm, galleryImages: [screenshots.blairsfilm], link: 'https://web.archive.org/web/20190102201032/http://blairsfilm.com/', tech: ['Frontend', 'jQuery', 'RWD'],
    theme: { background: '#292323', surface: '#f6f1ee', text: '#fff8f5', mutedText: '#d9c9c4', accent: '#dba88f', overlay: '#1d1919', headerBackground: '#241f1f' },
  },
  {
    id: '18ranch', slug: '18-ranch', title: '十八養場', category: 'BRAND & ECOMMERCE',
    description: '從人道飼養、非基改飼料到產品檢驗與料理應用，傳達紅玉雞產品的安心來源，並串連商品、食譜與銷售通路。',
    coverImage: screenshots.ranch18, galleryImages: [screenshots.ranch18], link: 'https://www.18ranch.com.tw/', tech: ['Frontend', 'Ecommerce', 'RWD'],
    theme: { background: '#69531e', surface: '#fff9e9', text: '#fff9e9', mutedText: '#e8d9ad', accent: '#f2c65a', overlay: '#4c3c16', headerBackground: '#5c491b' },
  },
  {
    id: 'grobest', slug: 'grobest-group', title: '全興國際水產', category: 'GLOBAL CORPORATE',
    description: '以永續水產養殖為核心，整合營養方案、飼料產品、技術服務與研發成果，呈現橫跨亞洲多個市場的企業規模。',
    coverImage: screenshots.grobest, galleryImages: [screenshots.grobest], link: 'https://www.grobest.com/', tech: ['Frontend', 'CMS', 'RWD'],
    theme: { background: '#075a8f', surface: '#eaf6fc', text: '#eefaff', mutedText: '#b9daeb', accent: '#55d7ff', overlay: '#064268', headerBackground: '#064f7e' },
  },
]
