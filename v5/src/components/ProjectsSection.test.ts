import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { works } from '../data/projects'
import ProjectsSection from './ProjectsSection.vue'

describe('ProjectsSection', () => {
  it('每個作品提供可分享的 Projects 深連結，並可依網址要求開啟指定作品', async () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })))
    const wrapper = mount(ProjectsSection)

    expect(works.map((work) => work.id)).toEqual([
      'taboard', 'autopo-ai', 'inbox-pilot', 'aaady', 'grapeking', '18ranch', 'grobest', 'repon',
      'yudah-model', 'yudah-art', 'yudah-rm', 'biip-dcc', 'uneec', 'blairsfilm', 'mtr',
    ])
    expect(wrapper.findAll('.project-strip').at(0)?.attributes('href')).toBe('#projects/taboard')
    expect(wrapper.findAll('.project-strip').at(-1)?.attributes('href')).toBe('#projects/wooden-man')
    expect(wrapper.findAll('.project-strip').at(0)?.attributes('draggable')).toBe('false')
    expect(wrapper.findAll('.project-strip__ai-icon')).toHaveLength(3)
    expect(wrapper.find('.project-strip__ai-icon').attributes()).toMatchObject({
      src: '/images/projects/inbox-pilot-ai-icon.png',
      alt: 'AI 製作專案',
    })
    expect(works.find((work) => work.id === 'autopo-ai')?.galleryImages).toEqual([
      '/images/projects/autopo-ai-1.png',
      '/images/projects/autopo-ai-2.png',
      '/images/projects/autopo-ai-3.png',
      '/images/projects/autopo-ai-4.png',
      '/images/projects/autopo-ai-5.png',
    ])
    expect(works.find((work) => work.id === 'autopo-ai')?.tech).toEqual([
      'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
    ])
    expect(works.find((work) => work.id === 'autopo-ai')?.vibeCoding).toEqual([
      'ChatGPT / Codex', 'Gemini / Antigravity',
    ])
    expect(works.find((work) => work.id === 'taboard')?.galleryImages).toEqual([
      '/images/projects/taboard-1.png',
      '/images/projects/taboard-2.png',
    ])
    expect(works.find((work) => work.id === 'taboard')?.tech).toEqual([
      'Chrome Extension', 'React', 'TypeScript', 'Tailwind CSS',
    ])
    expect(works.find((work) => work.id === 'taboard')?.vibeCoding).toEqual([
      'ChatGPT / Codex', 'Gemini / Antigravity',
    ])
    expect(works.find((work) => work.id === 'inbox-pilot')?.tech).toEqual(['Next.js', 'React', 'Tailwind CSS', 'Vercel'])
    expect(works.find((work) => work.id === 'inbox-pilot')?.vibeCoding).toEqual([
      'ChatGPT / Codex',
      'Gemini / Antigravity',
      'Perplexity',
      'Ollama / qwen2.5-coder:7b',
    ])

    window.dispatchEvent(new window.CustomEvent('portfolio:work-request', {
      detail: { slug: 'inbox-pilot', history: 'none' },
    }))
    await nextTick()
    expect(wrapper.find('ul[aria-label="使用技術"]').text()).toContain('Next.js')
    expect(wrapper.find('ul[aria-label="Vibe Coding"]').text()).toContain('ChatGPT / Codex')

    window.dispatchEvent(new window.CustomEvent('portfolio:work-request', {
      detail: { slug: '18-ranch', history: 'none' },
    }))
    await nextTick()

    expect(wrapper.find('.work-detail__copy h2').text()).toBe('十八養場')
    const ranchIndex = works.findIndex((work) => work.id === '18ranch')
    expect((wrapper.find('.projects-wall__track').element as HTMLElement).scrollLeft).toBe(ranchIndex * 260)

    wrapper.unmount()
    vi.unstubAllGlobals()
  })

  it('每次切換一個作品時，清單固定前進 260px', async () => {
    // 無動畫模式也必須能立即操作，讓測試驗證位置而不依賴 GSAP 的實際計時。
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })))
    const wrapper = mount(ProjectsSection)
    const track = wrapper.find('.projects-wall__track').element as HTMLElement

    await wrapper.find('.project-strip').trigger('click')
    await nextTick()
    expect(wrapper.find('[aria-label="作品詳情"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="上一個作品"]').exists()).toBe(false)
    expect(wrapper.find('[aria-label="下一個作品"]').exists()).toBe(true)
    expect(wrapper.find('.projects-wall__track').classes()).toContain('is-detail-open')
    expect(wrapper.findAll('.project-strip.is-active')).toHaveLength(1)
    expect(wrapper.find('.project-strip__identity i').exists()).toBe(false)
    expect(track.scrollLeft).toBe(0)

    await wrapper.find('.work-detail__close').trigger('click')
    await nextTick()
    expect(wrapper.find('[aria-label="作品詳情"]').exists()).toBe(false)
    expect(wrapper.find('.projects-wall__track').classes()).not.toContain('is-detail-open')
    expect(wrapper.find('.projects-wall__track').classes()).not.toContain('is-opening')
    expect(wrapper.find('.project-strip__identity i').exists()).toBe(true)

    await wrapper.find('.project-strip').trigger('click')
    await nextTick()
    await wrapper.find('[aria-label="下一個作品"]').trigger('click')
    await nextTick()
    expect(wrapper.find('.work-detail__copy h2').text()).toBe(works[1].title)
    expect(track.scrollLeft).toBe(260)
    expect(wrapper.find('.project-strip.is-active').attributes('aria-label')).toContain(works[1].title)

    wrapper.unmount()
    vi.unstubAllGlobals()
  })

  it('首尾不顯示無法使用的切換按鈕，尾端保留可展開的空間', async () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })))
    const wrapper = mount(ProjectsSection)
    const track = wrapper.find('.projects-wall__track').element as HTMLElement

    await wrapper.find('.project-strip').trigger('click')
    await nextTick()

    for (let index = 1; index < works.length; index += 1) {
      await wrapper.find('[aria-label="下一個作品"]').trigger('click')
      await nextTick()
    }

    expect(wrapper.find('.work-detail__copy h2').text()).toBe(works.at(-1)?.title)
    expect(wrapper.find('[aria-label="上一個作品"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="下一個作品"]').exists()).toBe(false)
    expect(track.scrollLeft).toBe((works.length - 1) * 260)
    expect(wrapper.find('.projects-wall__end-space').exists()).toBe(true)

    wrapper.unmount()
    vi.unstubAllGlobals()
  })
})
