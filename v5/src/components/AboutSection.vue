<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

type TeamMember = {
  id: string
  name: string
  role: string
  provider: string
  reasoning: string
  image: string
  alt: string
  bio: string
  duties: string[]
  isBoss?: boolean
}

const teamMembers: TeamMember[] = [
  {
    id: 'eden', name: 'Eden 仕林', role: '團隊主理人', provider: '人類決策者', reasoning: '依專案需求判斷', image: '/images/ai-team/eden.webp', alt: 'Eden 仕林雙手交叉站立的人像', isBoss: true,
    bio: '負責確認需求、選擇方向與最後驗收。AI 可以加快整理與實作，但作品該長成什麼樣子，還是由我一起把關。',
    duties: ['確認需求與優先順序', '整合 AI 產出並做取捨', '視覺、內容與成果驗收']
  },
  {
    id: 'orchestrator', name: 'Orchestrator', role: '協作調度者', provider: 'AI Team deterministic controller', reasoning: '不使用 LLM 判斷成功', image: '/images/ai-team/orchestrator.webp', alt: '代表協作調度者的女性人物去背照片',
    bio: '把工作流程拆成明確節點，安排任務交接與狀態檢查，讓每位成員在合適的時間處理合適的事情。',
    duties: ['任務分派與流程編排', '交接條件與狀態控管', '以可驗證規則管理完成度']
  },
  {
    id: 'codex', name: 'ChatGPT / Codex', role: '架構覆核・工程・審查', provider: 'Codex／GPT-5.6 Sol・Terra', reasoning: '高～極高', image: '/images/ai-team/codex.webp', alt: '代表 ChatGPT 與 Codex 的男性人物去背照片',
    bio: '同時參與架構覆核、工程實作與程式審查；把想法落成可維護的程式，並在交付前找出容易被忽略的細節。',
    duties: ['架構覆核', '前端與工程實作', '程式碼審查與驗證建議']
  },
  {
    id: 'antigravity', name: 'Gemini / Antigravity', role: '產品・架構・品質測試', provider: 'Antigravity／Gemini 3.1 Pro', reasoning: '高～極高', image: '/images/ai-team/antigravity.webp', alt: '代表 Gemini 與 Antigravity 的女性人物去背照片',
    bio: '從產品目標、方案架構到測試情境提供不同視角，協助把模糊需求收斂成能討論、能驗證的做法。',
    duties: ['產品經理：目標與需求收斂', '架構師：方案與風險設計', 'QA：測試情境與品質檢查']
  },
  {
    id: 'ollama', name: 'Ollama', role: '專案分析師', provider: 'HandsFreeCode／qwen2.5-coder:7b', reasoning: '預設', image: '/images/ai-team/ollama.webp', alt: '代表 Ollama 本地模型的男性人物去背照片',
    bio: '以本地模型協助初步盤點、整理與分析，讓簡單、可重複的問題先有一個穩定的起點。',
    duties: ['專案脈絡初步分析', '可重複資訊整理', '本地模型輔助工作']
  }
]

const activeMember = ref<TeamMember | null>(null)
const selectedMemberId = ref<string | null>(null)
const isOpening = ref(false)
const isSectionVisible = ref(false)
const isTutorialVisible = ref(false)
const sectionRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<globalThis.HTMLButtonElement | null>(null)
let sectionObserver: IntersectionObserver | null = null
let openTimer: ReturnType<typeof setTimeout> | null = null
let selectionTimer: ReturnType<typeof setTimeout> | null = null

function openMember(member: TeamMember) {
  if (openTimer) globalThis.clearTimeout(openTimer)
  if (selectionTimer) globalThis.clearTimeout(selectionTimer)
  selectedMemberId.value = member.id
  isOpening.value = true
  const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 320
  openTimer = setTimeout(() => {
    activeMember.value = member
    isOpening.value = false
    void nextTick(() => closeButtonRef.value?.focus())
  }, delay)
}

function closeMember() {
  if (openTimer) globalThis.clearTimeout(openTimer)
  activeMember.value = null
  isOpening.value = false
  selectionTimer = setTimeout(() => { selectedMemberId.value = null }, 1050)
}

function moveMember(offset: number) {
  if (!activeMember.value) return
  const currentIndex = teamMembers.findIndex((member) => member.id === activeMember.value?.id)
  activeMember.value = teamMembers[(currentIndex + offset + teamMembers.length) % teamMembers.length]
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMember()
  if (event.key === 'ArrowLeft') moveMember(-1)
  if (event.key === 'ArrowRight') moveMember(1)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  sectionObserver = new IntersectionObserver(([entry]) => {
    isSectionVisible.value = Boolean(entry?.isIntersecting)
    isTutorialVisible.value = Boolean(entry?.isIntersecting)
  }, { threshold: .35 })
  if (sectionRef.value) sectionObserver.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  sectionObserver?.disconnect()
  if (openTimer) globalThis.clearTimeout(openTimer)
  if (selectionTimer) globalThis.clearTimeout(selectionTimer)
})
</script>

<template>
  <section id="about" ref="sectionRef" class="team-section" :class="{ 'team-section--visible': isSectionVisible }" aria-labelledby="team-title">
    <!-- 進入 Team 後的團隊總覽：以人物與留白為主角。 -->
    <div class="team-overview" :class="{ 'team-overview--hidden': activeMember, 'team-overview--opening': isOpening }" :aria-hidden="activeMember ? 'true' : undefined" :inert="Boolean(activeMember)">
      <header class="team-overview__intro">
        <p>ME &amp; AI TEAM</p>
        <h2 id="team-title">與 AI 同行</h2>
      </header>

      <div class="team-overview__lineup" aria-label="AI 協作團隊成員">
        <button
          v-for="member in teamMembers"
          :key="member.id"
          class="team-overview__member"
          :class="{ 'team-overview__member--selected': selectedMemberId === member.id }"
          type="button"
          :aria-label="`查看 ${member.name} 的職責`"
          @click="openMember(member)"
        >
          <span class="team-overview__figure">
            <img :src="member.image" :alt="member.alt" class="team-overview__portrait" />
            <span class="team-overview__target" aria-hidden="true"></span>
          </span>
          <span class="team-overview__label">
            <b v-if="member.isBoss">BOSS</b>
            <strong>{{ member.name }}</strong>
            <small>{{ member.role }}</small>
          </span>
        </button>
      </div>

      <div v-if="isTutorialVisible" class="team-tutorial" aria-hidden="true">
        <span class="team-tutorial__cursor">↖</span>
        <span class="team-tutorial__hint">點擊查看分工</span>
      </div>
    </div>

    <!-- 點選人物後的個人介紹：保留參考頁的全版單人敘事。 -->
    <Transition name="profile-view" :duration="{ enter: 3100, leave: 1200 }">
      <section v-if="activeMember" class="team-profile" role="dialog" aria-modal="true" :aria-labelledby="`member-${activeMember.id}`">
        <button ref="closeButtonRef" class="team-profile__close" type="button" aria-label="回到團隊總覽" @click.stop="closeMember">×</button>
        <button class="team-profile__arrow team-profile__arrow--previous" type="button" aria-label="上一位成員" @click="moveMember(-1)">‹</button>
        <button class="team-profile__arrow team-profile__arrow--next" type="button" aria-label="下一位成員" @click="moveMember(1)">›</button>

        <div class="team-profile__backdrop" aria-hidden="true"></div>
        <div class="team-profile__mask" aria-hidden="true"></div>
        <div class="team-profile__sweep" aria-hidden="true"></div>

        <Transition name="member-switch" mode="out-in">
          <div :key="activeMember.id" class="team-profile__figure" :class="{ 'team-profile__figure--boss': activeMember.isBoss }">
            <img :src="activeMember.image" :alt="activeMember.alt" class="team-profile__portrait" />
          </div>
        </Transition>

        <Transition name="member-switch" mode="out-in">
          <article :key="activeMember.id" class="team-profile__content">
            <span v-if="activeMember.isBoss" class="team-profile__badge">BOSS</span>
            <p>{{ activeMember.role }}</p>
            <h3 :id="`member-${activeMember.id}`">{{ activeMember.name }}</h3>
            <p class="team-profile__bio">{{ activeMember.bio }}</p>

            <dl>
              <div>
                <dt>Provider／模型</dt>
                <dd>{{ activeMember.provider }}</dd>
              </div>
              <div>
                <dt>推理程度</dt>
                <dd>{{ activeMember.reasoning }}</dd>
              </div>
            </dl>

            <ul aria-label="主要職責">
              <li v-for="duty in activeMember.duties" :key="duty">{{ duty }}</li>
            </ul>
          </article>
        </Transition>
      </section>
    </Transition>
  </section>
</template>

<style scoped>
.team-section {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  color: #273449;
  background: #f5f8fa;
}

.team-overview,
.team-profile {
  position: absolute;
  inset: 0;
}

.team-overview {
  display: grid;
  place-items: center;
  overflow: hidden;
  background: linear-gradient(180deg, #d7e5ee 0%, #edf3f7 23%, #fff 49%, #fff 67%, #e8eef3 100%);
  transition: opacity .4s ease, transform .5s cubic-bezier(.16, 1, .3, 1);
}

.team-overview--hidden { opacity: .12; pointer-events: none; filter: grayscale(.55); transform: scale(1.018); }

.team-overview__intro {
  position: absolute;
  top: clamp(3rem, 12vh, 7rem);
  left: 50%;
  width: min(42rem, calc(100% - 3rem));
  text-align: center;
  transform: translateX(-50%);
}

.team-overview__intro p,
.team-overview__intro > span,
.team-overview__label,
.team-profile__content > p,
.team-profile dt,
.team-profile__badge {
  font-family: 'Fira Code', monospace;
  letter-spacing: .08em;
}

.team-overview__intro p { margin: 0 0 1rem; color: #e05a3f; font-size: .75rem; }
.team-overview__intro h2 { margin: 0; color: #fff; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(2rem, 3.7vw, 4.25rem); font-weight: 600; line-height: 1.15; letter-spacing: -.03em; text-wrap: balance; }

.team-overview__intro { opacity: 0; transform: translate(-50%, 1.5rem); }
.team-section--visible .team-overview__intro { animation: teamIntroArrive .7s cubic-bezier(.16, 1, .3, 1) 1.35s both; }
@keyframes teamIntroArrive { to { opacity: 1; transform: translate(-50%, 0); } }

.team-overview__lineup { position: absolute; bottom: clamp(2rem, 9vh, 5.5rem); left: 50%; display: flex; align-items: end; justify-content: center; width: min(54rem, calc(100% - 2rem)); height: min(40vh, 24rem); transform: translateX(-50%); }
.team-overview__member { position: relative; flex: 1 1 0; align-self: stretch; min-width: 0; border: 0; padding: 0; color: inherit; cursor: pointer; background: transparent; opacity: 0; transform: translateY(-4rem) scale(.12); transform-origin: center bottom; transition: opacity .35s ease, filter .35s ease, transform .48s cubic-bezier(.16, 1, .3, 1); }
.team-section--visible .team-overview__member { opacity: 1; transform: translateY(0) scale(1); animation: teamMemberArrive .72s cubic-bezier(.16, 1, .3, 1) backwards; }
.team-section--visible .team-overview__member:nth-child(3) { animation-delay: .12s; }
.team-section--visible .team-overview__member:nth-child(4) { animation-delay: .34s; }
.team-section--visible .team-overview__member:nth-child(2) { animation-delay: .56s; }
.team-section--visible .team-overview__member:nth-child(5) { animation-delay: .78s; }
.team-section--visible .team-overview__member:nth-child(1) { animation-delay: 1s; }
@keyframes teamMemberArrive {
  from { opacity: 0; transform: translateY(-4rem) scale(.12); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.team-overview__member:focus-visible { z-index: 2; outline: 2px solid #e05a3f; outline-offset: .3rem; }
.team-overview__member:hover, .team-overview__member:focus-visible { z-index: 4; transform: translateY(.45rem) scale(1.075); }
.team-overview__lineup:has(.team-overview__member:hover) .team-overview__member:not(:hover),
.team-overview__lineup:has(.team-overview__member:focus-visible) .team-overview__member:not(:focus-visible) { opacity: .28; filter: grayscale(.65) brightness(.78); }
.team-overview--opening .team-overview__member:not(.team-overview__member--selected) { opacity: .18; filter: grayscale(.75); transform: scale(.94); }
.team-overview--opening .team-overview__member--selected { z-index: 5; transform: translateY(2rem) scale(1.22); }
.team-overview__figure { position: absolute; right: 0; bottom: 0; left: 0; height: 100%; }
.team-overview__figure > img { position: absolute; bottom: 2.75rem; left: 50%; width: min(14rem, 150%); height: 94%; object-fit: contain; object-position: center bottom; transform: translateX(-50%); filter: drop-shadow(0 .5rem .5rem rgba(42, 56, 75, .16)); transition: filter .35s ease; }
.team-overview__portrait {
  mask-image: linear-gradient(to bottom, #000 0%, #000 70%, rgba(0, 0, 0, .88) 77%, rgba(0, 0, 0, .38) 86%, transparent 94%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 70%, rgba(0, 0, 0, .88) 77%, rgba(0, 0, 0, .38) 86%, transparent 94%, transparent 100%);
}
.team-overview__member:hover .team-overview__figure > img:first-child, .team-overview__member:focus-visible .team-overview__figure > img:first-child { filter: drop-shadow(0 .8rem .7rem rgba(42, 56, 75, .24)); }
.team-overview__target { position: absolute; z-index: 3; bottom: 2.6rem; left: 50%; width: 1.6rem; height: 1.6rem; border: 1px solid rgba(224, 90, 63, .78); border-radius: 50%; transform: translateX(-50%); animation: teamTargetHeartbeat 1.8s ease-in-out infinite; }
.team-overview__target::after { position: absolute; inset: .35rem; border: 1px solid rgba(224, 90, 63, .7); border-radius: inherit; content: ''; }
.team-tutorial { position: absolute; z-index: 6; inset: 0; pointer-events: none; }
.team-tutorial__cursor { position: absolute; top: 45%; left: 50%; color: #1f2937; font: 2.4rem/1 Arial, sans-serif; text-shadow: 0 1px 0 #fff; opacity: 0; animation: tutorialCursor 6s cubic-bezier(.45, 0, .25, 1) 2; }
.team-tutorial__hint { position: absolute; left: 50%; bottom: 2.5rem; padding: .45rem .75rem; color: #526276; border: 1px solid rgba(82, 98, 118, .25); border-radius: 999px; background: rgba(255,255,255,.7); font: 500 .75rem/1.4 'Noto Sans TC', sans-serif; opacity: 0; animation: tutorialHint 6s ease 2; }
@keyframes teamTargetHeartbeat { 0%, 100% { opacity: .65; transform: translateX(-50%) scale(.92); box-shadow: 0 0 0 0 rgba(224,90,63,.22); } 45% { opacity: 1; transform: translateX(-50%) scale(1.08); box-shadow: 0 0 0 .65rem rgba(224,90,63,0); } }
@keyframes tutorialCursor { 0%, 8% { opacity: 0; left: 50%; top: 45%; transform: scale(.7); } 15% { opacity: 1; } 42% { opacity: 1; left: 10%; top: 66%; transform: scale(1); } 49% { opacity: 1; left: 10%; top: 66%; transform: scale(.75); } 56% { opacity: 1; left: 10%; top: 66%; transform: scale(1); } 76% { opacity: 1; } 92%, 100% { opacity: 0; left: 10%; top: 66%; transform: scale(.7); } }
@keyframes tutorialHint { 0%, 72% { opacity: 0; transform: translateY(.4rem); } 82%, 94% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-.2rem); } }
.team-overview__label { position: absolute; z-index: 4; bottom: 0; left: 50%; display: grid; gap: .28rem; width: max-content; max-width: 11rem; text-align: center; opacity: 1; transform: translate(-50%, 0); transition: opacity .25s ease, color .25s ease, transform .25s ease; }
.team-overview__label strong { color: #273449; font-size: .875rem; line-height: 1.5; }
.team-overview__label small { color: #637186; font-size: .75rem; line-height: 1.6; }
.team-overview__label b { justify-self: center; padding: .23rem .4rem; color: #fff; font-size: .75rem; font-weight: 600; background: #e05a3f; }

.team-profile { isolation: isolate; z-index: 60; display: grid; grid-template-columns: minmax(23rem, 43%) 1fr; align-items: center; padding: clamp(4rem, 9vh, 7rem) clamp(3rem, 9vw, 11rem); overflow: hidden; background: transparent; }
.team-profile__backdrop { position: absolute; z-index: 0; inset: 0; background: linear-gradient(180deg, #d7e5ee 0%, #edf3f7 23%, #fff 49%, #fff 67%, #e8eef3 100%); }
.team-profile__mask { position: absolute; z-index: 2; inset: 0; pointer-events: none; background: rgba(239, 244, 247, .76); }
.team-profile__sweep { position: absolute; z-index: 3; top: 50%; left: 50%; width: 190vw; height: 45vw; pointer-events: none; background: rgba(255, 255, 255, .88); box-shadow: 0 0 1.25rem rgba(255, 255, 255, .55); transform: translate(-50%, -50%) rotate(145deg); transform-origin: center; }
.team-profile__ghosts { position: absolute; z-index: 1; bottom: -5.5rem; left: 50%; display: flex; align-items: end; justify-content: center; width: min(50rem, 74vw); height: 20rem; opacity: .12; transform: translateX(-50%); }
.team-profile__ghosts img { flex: 1 1 0; width: min(11rem, 125%); height: 100%; object-fit: contain; object-position: center bottom; filter: grayscale(1); }
.team-profile__close, .team-profile__arrow { position: absolute; z-index: 5; display: grid; place-items: center; border: 0; color: #8190a3; cursor: pointer; background: transparent; transition: color .2s ease, transform .2s ease; }
.team-profile__close { top: 1.25rem; left: 1.25rem; width: 3rem; height: 3rem; font-size: 2.5rem; font-weight: 200; line-height: 1; pointer-events: auto; touch-action: manipulation; }
.team-profile__arrow { top: 50%; width: 3.5rem; height: 5rem; font-size: 4.5rem; font-weight: 200; transform: translateY(-50%); }
.team-profile__arrow--previous { left: 1rem; }
.team-profile__arrow--next { right: 1rem; }
.team-profile__close:hover, .team-profile__close:focus-visible, .team-profile__arrow:hover, .team-profile__arrow:focus-visible { color: #e05a3f; outline: none; }
.team-profile__arrow:hover { transform: translateY(-50%) scale(1.12); }

.team-profile__figure { position: relative; z-index: 4; align-self: end; height: min(72vh, 43rem); }
.team-profile__figure > img { position: absolute; z-index: 1; bottom: 4.5rem; left: 50%; width: min(34rem, 132%); height: 96%; object-fit: contain; object-position: center bottom; transform: translateX(-50%); filter: drop-shadow(0 1rem 1rem rgba(42, 56, 75, .17)); }
.team-profile__portrait {
  /* 主圖晚一點才淡出，倒影提前疊進下緣，避免中間形成白色斷層。 */
  mask-image: linear-gradient(to bottom, #000 0%, #000 76%, rgba(0, 0, 0, .88) 84%, rgba(0, 0, 0, .3) 94%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 76%, rgba(0, 0, 0, .88) 84%, rgba(0, 0, 0, .3) 94%, transparent 100%);
}
.team-profile__content { position: relative; z-index: 4; max-width: 39rem; padding-left: clamp(1rem, 6vw, 8rem); }
.team-profile__badge { display: inline-block; margin-bottom: 1.1rem; padding: .3rem .48rem; color: #fff; font-size: .75rem; background: #e05a3f; }
.team-profile__content > p { margin: 0 0 .85rem; color: #e05a3f; font-size: .75rem; line-height: 1.6; }
.team-profile__content h3 { margin: 0; color: #273449; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(3rem, 6vw, 6rem); font-weight: 600; line-height: .9; letter-spacing: -.04em; text-wrap: balance; }
.team-profile__bio { max-width: 44ch; margin: 1.6rem 0 1.8rem !important; color: #526276 !important; font-family: 'Inter', 'Noto Sans TC', sans-serif !important; font-size: .98rem !important; letter-spacing: 0 !important; line-height: 1.85 !important; text-wrap: pretty; }
.team-profile dl { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.25rem; max-width: 39rem; padding: 1.1rem 0; border-block: 1px solid #d8e0e7; }
.team-profile dl div { min-width: 0; }
.team-profile dt { margin-bottom: .45rem; color: #8190a3; font-size: .75rem; }
.team-profile dd { margin: 0; color: #34445a; font-size: .875rem; line-height: 1.65; overflow-wrap: anywhere; }
.team-profile ul { display: grid; gap: .5rem; padding: 0; margin: 1.4rem 0 0; color: #34445a; list-style: none; }
.team-profile li { font-size: .875rem; line-height: 1.65; }
.team-profile li::before { margin-right: .5rem; color: #e05a3f; content: '—'; }

.member-switch-enter-active { transition: opacity .4s ease, transform .52s cubic-bezier(.16, 1, .3, 1); }
.member-switch-leave-active { transition: opacity .18s ease, transform .22s ease; }
.member-switch-enter-from { opacity: 0; transform: translateX(-3.5rem); }
.member-switch-leave-to { opacity: 0; transform: translateX(1.25rem); }

.profile-view-enter-active .team-profile__mask { transition: opacity .28s ease; }
.profile-view-enter-active .team-profile__sweep { animation: profileParallelogramIn 1.32s linear .25s both; }
.profile-view-enter-active .team-profile__ghosts { transition: opacity .6s ease .25s, transform .72s cubic-bezier(.16, 1, .3, 1) .25s; }
.profile-view-enter-active .team-profile__badge { transition: transform .42s cubic-bezier(.16, 1, .3, 1) 1.58s, opacity .3s ease 1.58s; }
.profile-view-enter-active .team-profile__content > p:first-of-type { transition: transform .46s cubic-bezier(.16, 1, .3, 1) 1.68s, opacity .34s ease 1.68s; }
.profile-view-enter-active .team-profile__content h3 { transition: transform .5s cubic-bezier(.16, 1, .3, 1) 1.78s, opacity .36s ease 1.78s; }
.profile-view-enter-active .team-profile__bio { transition: transform .48s cubic-bezier(.16, 1, .3, 1) 1.9s, opacity .36s ease 1.9s; }
.profile-view-enter-active .team-profile__content dl { transition: transform .48s cubic-bezier(.16, 1, .3, 1) 2.02s, opacity .36s ease 2.02s; }
.profile-view-enter-active .team-profile__content ul { transition: transform .48s cubic-bezier(.16, 1, .3, 1) 2.14s, opacity .36s ease 2.14s; }
.profile-view-enter-active .team-profile__figure { transition: transform .68s cubic-bezier(.16, 1, .3, 1) 2.3s, opacity .5s ease 2.3s; }

.profile-view-leave-active .team-profile__backdrop { transition: opacity .22s ease .9s; }
.profile-view-leave-active .team-profile__mask { transition: opacity .25s ease .82s; }
.profile-view-leave-active .team-profile__sweep { transition: height .62s cubic-bezier(.77, 0, .175, 1) .28s, transform .78s cubic-bezier(.77, 0, .175, 1) .05s, opacity .18s ease .9s; }
.profile-view-leave-active .team-profile__ghosts { transition: opacity .55s ease .25s, transform .65s cubic-bezier(.4, 0, 1, 1) .2s; }
.profile-view-leave-active .team-profile__figure { transition: transform .48s cubic-bezier(.4, 0, 1, 1), opacity .3s ease .12s; }
.profile-view-leave-active .team-profile__content > * { transition: transform .24s ease, opacity .18s ease; }

.profile-view-enter-from .team-profile__mask,
.profile-view-leave-to .team-profile__mask,
.profile-view-leave-to .team-profile__backdrop { opacity: 0; }
.profile-view-leave-to .team-profile__sweep { height: 1px; opacity: 0; transform: translate(-50%, -50%) rotate(35deg); }
.profile-view-enter-from .team-profile__ghosts,
.profile-view-leave-to .team-profile__ghosts { opacity: 0; transform: translate(-50%, 3rem) scale(.95); }
/* 平行四邊形完成旋轉後，文字依序由左淡入，人物圖片最後進場。 */
.profile-view-enter-from .team-profile__figure,
.profile-view-leave-to .team-profile__figure { opacity: 0; transform: translateX(-5rem); }
.profile-view-enter-from .team-profile__content > p:first-of-type,
.profile-view-leave-to .team-profile__content > p:first-of-type { opacity: 0; transform: translateX(-3rem); }
.profile-view-enter-from .team-profile__content h3,
.profile-view-leave-to .team-profile__content h3 { opacity: 0; transform: translateX(-3rem); }
.profile-view-enter-from .team-profile__badge,
.profile-view-leave-to .team-profile__badge { opacity: 0; transform: translateX(-3rem); }
.profile-view-enter-from .team-profile__bio,
.profile-view-enter-from .team-profile__content dl,
.profile-view-enter-from .team-profile__content ul,
.profile-view-leave-to .team-profile__bio,
.profile-view-leave-to .team-profile__content dl,
.profile-view-leave-to .team-profile__content ul { opacity: 0; transform: translateX(-3rem); }

@keyframes profileParallelogramIn {
  0% { height: 1px; opacity: 0; transform: translate(-50%, -50%) rotate(35deg); }
  12% { height: 1px; opacity: 1; transform: translate(-50%, -50%) rotate(35deg); }
  48% { height: 1px; opacity: 1; transform: translate(-50%, -50%) rotate(35deg); animation-timing-function: cubic-bezier(.77, 0, .175, 1); }
  76% { height: 45vw; opacity: 1; transform: translate(-50%, -50%) rotate(35deg); animation-timing-function: cubic-bezier(.77, 0, .175, 1); }
  100% { height: 45vw; opacity: 1; transform: translate(-50%, -50%) rotate(145deg); }
}

@media (max-width: 760px) {
  .team-section { min-height: 100svh; }
  .team-overview__intro { top: 3.5rem; }
  .team-overview__intro h2 { font-size: clamp(1.75rem, 8vw, 2.5rem); }
  .team-overview__lineup { bottom: 2rem; width: calc(100% - 1rem); height: 42vh; }
  .team-overview__figure > img { width: min(9rem, 170%); height: 85%; bottom: 1.75rem; }
  .team-overview__target { bottom: 1.7rem; }
  .team-overview__label { display: grid; gap: .15rem; width: 4.6rem; max-width: 100%; }
  .team-overview__label strong { font-size: .52rem; }
  .team-overview__label small { font-size: .4rem; }
  .team-overview__label b { padding: .16rem .28rem; font-size: .42rem; }
  .team-profile { grid-template-columns: 1fr; align-content: start; gap: 0; padding: 3.75rem 1.25rem 1.5rem; overflow-y: auto; }
  .team-profile__ghosts { bottom: -4rem; width: 125%; height: 13rem; }
  .team-profile__figure { height: 39svh; min-height: 18rem; }
  .team-profile__figure > img { bottom: 1.4rem; width: min(19rem, 91%); }
  .team-profile__content { padding: 1rem .5rem 2rem; }
  .team-profile__content h3 { font-size: clamp(2.7rem, 13vw, 4.4rem); }
  .team-profile__arrow { top: 38%; width: 2.5rem; font-size: 3.2rem; }
  .team-profile__arrow--previous { left: .1rem; }
  .team-profile__arrow--next { right: .1rem; }
  .team-profile dl { grid-template-columns: 1fr; gap: .85rem; }
}

@media (prefers-reduced-motion: reduce) {
  .team-section *, .team-section *::before, .team-section *::after { animation-delay: 0s !important; animation-duration: .01ms !important; transition-delay: 0s !important; transition-duration: .01ms !important; }
}
</style>
