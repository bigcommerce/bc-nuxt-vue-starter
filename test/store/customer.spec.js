import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';

describe('store/customer', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let NuxtStore;
  let store;

  beforeAll(async () => {
    const storePath = `${process.env.buildDir}/store.js`;
    NuxtStore = await import(storePath);
  });

  beforeEach(async () => {
    store = await NuxtStore.createStore();
  });

  describe('customer', () => {
    test('getter is a function', () => {
      const customer = store.getters['customer/customer'];
      expect(customer).toBe(null);
    });
  });
});
