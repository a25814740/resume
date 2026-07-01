import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import App from './App.vue';

describe('App', () => {
  it('renders all three design concepts', () => {
    const wrapper = mount(App);

    expect(wrapper.text()).toContain('中文履歷作品集');
    expect(wrapper.text()).toContain('Frontend × AI Builder');
    expect(wrapper.text()).toContain('Productized Resume');
  });

  it('can switch concepts from the navigation controls', async () => {
    const wrapper = mount(App);
    const buttons = wrapper.findAll('[data-testid="concept-button"]');

    await buttons[1].trigger('click');
    expect(wrapper.find('[data-testid="active-concept"]').text()).toContain('Frontend × AI Builder');

    await buttons[2].trigger('click');
    expect(wrapper.find('[data-testid="active-concept"]').text()).toContain('Productized Resume');
  });
});
