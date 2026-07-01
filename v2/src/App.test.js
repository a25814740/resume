import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import App from './App.vue';

describe('App', () => {
  it('renders the AI application resume narrative', () => {
    const wrapper = mount(App);

    expect(wrapper.text()).toContain('羅仕林');
    expect(wrapper.text()).toContain('AI 應用落地型工程師');
    expect(wrapper.text()).toContain('我不是只會使用 AI 工具');
  });

  it('keeps portfolio projects as the final major section', () => {
    const wrapper = mount(App);
    const sections = wrapper.findAll('section[id]');
    const lastSection = sections.at(-1);

    expect(lastSection?.attributes('id')).toBe('projects');
    expect(lastSection?.text()).toContain('InboxPilot');
  });
});
