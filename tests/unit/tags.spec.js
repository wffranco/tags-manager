import { mount } from '@vue/test-utils'
import Tags from '@/components/Tags'

describe('Tags.vue', () => {
  const wrapper = mount(Tags);

  it('renders the navbar', () => {
    expect(wrapper.contains('nav.navbar')).toBe(true);
  })

  it('renders the insert input group', () => {
    expect(wrapper.contains('.container > form > .input-group > input')).toBe(true);
  })

  it('renders the list of tags', () => {
    expect(wrapper.contains('.container > ul')).toBe(true);
  })
})
