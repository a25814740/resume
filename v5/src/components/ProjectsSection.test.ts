import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import ProjectsSection from './ProjectsSection.vue'

describe('ProjectsSection', () => {
  it('opens a selected work and supports keyboard navigation', async () => {
    // 無動畫模式也必須能立即操作，並讓測試不依賴 GSAP 的實際計時。
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })))
    const wrapper = mount(ProjectsSection)
    await wrapper.findAll('button')[0].trigger('click')
    await nextTick()
    expect(wrapper.find('[aria-label="作品詳情"]').exists()).toBe(true)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
    await nextTick()
    expect(wrapper.find('.work-detail__copy h2').text()).toBe('葡萄王生技')

    wrapper.unmount()
    vi.unstubAllGlobals()
  })
})
