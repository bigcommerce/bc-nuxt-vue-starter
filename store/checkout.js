/* eslint-disable camelcase */
import axios from 'axios';
import { cartId } from '~/utils/storage';

const getLineItems = (item) => {
  if (item) {
    const { custom_items, digital_items, physical_items } = item;
    const items = [...custom_items, ...digital_items, ...physical_items];
    return items.map(({ id, quantity }) => ({ item_id: id, quantity }));
  }
  return [];
};

const getShippingMethod = (consignments) => {
  let method = null;
  if (consignments.length) {
    method = consignments[0].selected_shipping_option ?? null;
  }
  return method;
};

export const state = () => ({
  isLoading: false,
  // new
  personalDetails: null,
  shippingAddress: null,
  shippingMethod: null,
  billingAddress: null,
  // old
  line_items: [],
  old_consignments: [],
  old_billing_address: {}
});

export const getters = {
  isLoading(state) {
    return state.isLoading;
  },
  // set new checkout data
  personalDetails(state) {
    return state.personalDetails;
  },
  shippingAddress(state) {
    return state.shippingAddress;
  },
  shippingMethod(state) {
    return state.shippingMethod;
  },
  billingAddress(state) {
    return state.billingAddress;
  },
  paymentMethod(state) {
    return state.paymentMethod;
  },
  // For getting old data from checkout
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
  // new
  SET_PERSONAL_DETAILS(state, personalDetails) {
    state.personalDetails = personalDetails;
  },
  SET_SHIPPING_ADDRESS(state, shippingAddress) {
    state.shippingAddress = shippingAddress;
  },
  SET_SHIPPING_METHOD(state, shippingMethod) {
    state.shippingMethod = shippingMethod;
  },
  SET_BILLING_ADDRESS(state, billingAddress) {
    state.billingAddress = billingAddress;
  },
  SET_PAYMENT_METHOD(state, paymentMethod) {
    state.paymentMethod = paymentMethod;
  },
  // old
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
    if (cartId) {
      commit('SET_LOADING', true);
      axios.get(`/getCheckout?checkoutId=${cartId}`).then(({ data }) => {
        if (data.status) {
          const body = data.body;
          commit('SET_LINE_ITEMS', getLineItems(body?.data?.cart?.line_items));
          commit('SET_OLD_CONSIGNMENTS', body?.data?.consignments);
          commit(
            'SET_SHIPPING_METHOD',
            getShippingMethod(body?.data?.consignments)
          );
          commit('SET_OLD_BILLING_ADDRESS', body?.data?.billing_address);
        } else {
          this.$toast.error(data.message);
        }
        commit('SET_LOADING', false);
      });
    }
  },

  setConsignmentToCheckout(
    { commit, getters, dispatch },
    { shipping_address, shippingOptionId }
  ) {
    const data = [
      {
        shipping_address,
        line_items: getters.line_items
      }
    ];
    axios
      .post(`setConsignmentToCheckout?checkoutId=${cartId}`, { data })
      .then(({ data }) => {
        if (data.status) {
          this.$toast.success(data.message);
          if (shippingOptionId) {
            dispatch('updateShippingOption', {
              shippingOptionId,
              consignmentId: data.body.data.consignments[0].id
            });
          } else dispatch('getCheckout');
        } else {
          this.$toast.error(data.message);
        }
        commit('SET_LOADING', false);
      });
  },

  updateConsignmentToCheckout(
    { commit, getters, dispatch },
    { shipping_address, consignmentId, shippingOptionId }
  ) {
    const data = {
      shipping_address,
      line_items: getters.line_items
    };
    axios
      .put(
        `updateConsignmentToCheckout?checkoutId=${cartId}&consignmentId=${consignmentId}`,
        { data }
      )
      .then(({ data }) => {
        if (data.status) {
          this.$toast.success(data.message);
          dispatch('updateShippingOption', {
            shippingOptionId,
            consignmentId
          });
        } else {
          this.$toast.error(data.message);
        }
        commit('SET_LOADING', false);
      });
  },

  updateShippingOption(
    { commit, dispatch },
    { shippingOptionId, consignmentId }
  ) {
    axios
      .put(
        `updateShippingOption?checkoutId=${cartId}&consignmentId=${consignmentId}&shippingOptionId=${shippingOptionId}`
      )
      .then(({ data }) => {
        if (data.status) {
          this.$toast.success(data.message);
          dispatch('getCheckout');
        } else {
          this.$toast.error(data.message);
        }
        commit('SET_LOADING', false);
      });
  },

  setBillingAddress({ commit, dispatch }, billing_address) {
    axios
      .post(`setBillingAddressToCheckout?checkoutId=${cartId}`, {
        data: billing_address
      })
      .then(({ data }) => {
        if (data.status) {
          this.$toast.success(data.message);
          dispatch('createOrder');
        } else {
          this.$toast.error(data.message);
        }
        commit('SET_LOADING', false);
      });
  },

  createOrder({ commit, dispatch }) {
    axios.post(`createOrder?checkoutId=${cartId}`).then(({ data }) => {
      if (data.status) {
        dispatch('getCheckout');
        this.$toast.success(data.message);
      } else {
        this.$toast.error(data.message);
      }
      commit('SET_LOADING', false);
    });
  }
};
