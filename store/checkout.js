/* eslint-disable camelcase */
import axios from 'axios';

const getLineItems = (item) => {
  if (item) {
    const { custom_items, digital_items, physical_items } = item;
    const items = [...custom_items, ...digital_items, ...physical_items];
    return items.map(({ id, quantity }) => ({ id, quantity }));
  }
  return [];
};

export const state = () => ({
  isLoading: false,
  personalDetails: null,
  shippingAddress: null,
  line_items: [],
  old_consignments: [],
  old_billing_address: []
});

export const getters = {
  isLoading(state) {
    return state.isLoading;
  },
  personalDetails(state) {
    return state.personalDetails;
  },
  line_items(state) {
    return state.line_items;
  },
  old_consignments(state) {
    return state.old_consignments;
  },
  old_billing_address(state) {
    return state.old_billing_address;
  }
};

export const mutations = {
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
  SET_PERSONAL_DETAILS(state, personalDetails) {
    state.personalDetails = personalDetails;
  },
  SET_LINE_ITEMS(state, line_items) {
    state.line_items = line_items;
  },
  SET_OLD_CONSIGNMENTS(state, old_consignments) {
    state.old_consignments = old_consignments;
  },
  SET_OLD_BILLING_ADDRESS(state, old_billing_address) {
    state.old_billing_address = old_billing_address;
  }
};

export const actions = {
  getCheckout({ commit }) {
    const checkoutId = window.localStorage.getItem('cartId');
    if (checkoutId) {
      commit('SET_LOADING', true);
      axios.get(`/getCheckout?checkoutId=${checkoutId}`).then(({ data }) => {
        if (data.status) {
          const body = data.body;
          commit('SET_LINE_ITEMS', getLineItems(body?.data?.cart?.line_items));
          commit('SET_OLD_CONSIGNMENTS', body?.data?.consignments);
          commit('SET_OLD_BILLING_ADDRESS', body?.data?.billing_address);
        } else {
          this.$toast.error(data.message);
        }
        commit('SET_LOADING', false);
      });
    }
  }
};
