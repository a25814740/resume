import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { works } from '../data/projects'
import ProjectsSection from './ProjectsSection.vue'

describe('ProjectsSection', () => {
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
    expect(track.scrollLeft).toBe(0)

    await wrapper.find('[aria-label="下一個作品"]').trigger('click')
    await nextTick()
    expect(wrapper.find('.work-detail__copy h2').text()).toBe('葡萄王生技')
    expect(track.scrollLeft).toBe(260)

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
