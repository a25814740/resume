import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { works } from '../data/projects'
import ProjectsSection from './ProjectsSection.vue'

describe('ProjectsSection', () => {
  it('每個作品提供可分享的 Projects 深連結，並可依網址要求開啟指定作品', async () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })))
    const wrapper = mount(ProjectsSection)

    expect(wrapper.findAll('.project-strip').at(0)?.attributes('href')).toBe('#projects/wooden-man')
    expect(wrapper.findAll('.project-strip').at(-1)?.attributes('href')).toBe('#projects/grobest-group')
    expect(wrapper.findAll('.project-strip').at(0)?.attributes('draggable')).toBe('false')

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
    expect(wrapper.find('.work-detail__copy h2').text()).toBe('葡萄王生技')
    expect(track.scrollLeft).toBe(260)
    expect(wrapper.find('.project-strip.is-active').attributes('aria-label')).toContain('葡萄王生技')

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
