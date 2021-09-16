import { shallowMount } from '@vue/test-utils';
import Logo from '@/components/Logo.vue';

describe('Logo', () => {
  test('mounts logo component properly', () => {
    const wrapper = shallowMount(Logo, {});
    expect(wrapper.vm).toBeTruthy();
  });
});
