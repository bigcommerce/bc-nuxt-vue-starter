/* eslint-disable camelcase */
import axios from 'axios';
import { API_URL } from '~/config/constants';
import { getCartId, getOrderId, setOrderId } from '~/utils/storage';

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
  // new
  personalDetails: null,
  shippingAddress: null,
  shippingMethod: null,
  consignmentId: null,
  billingAddress: null,
  paymentOptions: [],
  // old
  line_items: [],
  old_consignments: [],
  old_billing_address: {}
});

export const getters = {
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
  consignmentId(state) {
    return state.consignmentId;
  },
  billingAddress(state) {
    return state.billingAddress;
  },
  paymentOptions(state) {
    return state.paymentOptions;
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
  SET_CONSIGNMENTID(state, consignmentId) {
    state.consignmentId = consignmentId;
  },
  SET_BILLING_ADDRESS(state, billingAddress) {
    state.billingAddress = billingAddress;
  },
  SET_PAYMENT_OPTIONS(state, paymentOptions) {
    state.paymentOptions = paymentOptions;
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
  async getCheckout({ commit }) {
    try {
      const checkoutId = getCartId();
      if (checkoutId) {
        const { data } = await axios.get(
          `${API_URL}/getCheckout?checkoutId=${checkoutId}`
        );
        const body = data?.data;
        commit('SET_LINE_ITEMS', getLineItems(body?.cart?.line_items));
        commit('SET_OLD_CONSIGNMENTS', body?.consignments);
        commit('SET_SHIPPING_METHOD', getShippingMethod(body?.consignments));
        commit('SET_OLD_BILLING_ADDRESS', body?.billing_address);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in getting checkout');
    }
  },

  async setConsignmentToCheckout(
    { commit, getters, dispatch },
    { shipping_address }
  ) {
    try {
      const consignment = [
        {
          shipping_address,
          line_items: getters.line_items
        }
      ];
      const checkoutId = getCartId();

      const { data } = await axios.post(
        `${API_URL}/setConsignmentToCheckout?checkoutId=${checkoutId}`,
        {
          consignment
        }
      );
      const body = data?.data;
      const consignmentData = body?.consignments[0];
      commit('SET_CONSIGNMENTID', consignmentData.id);
      dispatch('getCheckout');
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in setting consignment');
    }
  },

  async updateConsignmentToCheckout(
    { commit, dispatch, getters },
    { shipping_address, consignmentId }
  ) {
    try {
      const consignment = {
        shipping_address,
        line_items: getters.line_items
      };
      const checkoutId = getCartId();

      await axios.put(
        `${API_URL}/updateConsignmentToCheckout?checkoutId=${checkoutId}&consignmentId=${consignmentId}`,
        { consignment }
      );
      if (getters.shippingMethod?.id) {
        await dispatch('updateShippingOption', {
          shippingOptionId: getters.shippingMethod.id,
          consignmentId
        });
      }
      commit('SET_CONSIGNMENTID', consignmentId);
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in updating consignment');
    }
  },

  async setBillingAddress(
    { dispatch, getters },
    { billingAddress, shippingOptionId }
  ) {
    try {
      const checkoutId = getCartId();
      const orderId = getOrderId();
      const consignmentId = getters.consignmentId;

      await axios.post(
        `${API_URL}/setBillingAddressToCheckout?checkoutId=${checkoutId}`,
        {
          data: billingAddress
        }
      );
      await dispatch('updateShippingOption', {
        shippingOptionId,
        consignmentId
      });
      if (orderId) dispatch('getPaymentMethodByOrder', orderId);
      else dispatch('createOrder');
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in setting billing');
    }
  },

  async updateShippingOption(
    { dispatch },
    { shippingOptionId, consignmentId }
  ) {
    try {
      const checkoutId = getCartId();
      await axios.put(
        `${API_URL}/updateShippingOption?checkoutId=${checkoutId}&consignmentId=${consignmentId}&shippingOptionId=${shippingOptionId}`
      );
      dispatch('getCheckout');
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in updating shipping option');
    }
  },

  async createOrder({ dispatch }) {
    try {
      const checkoutId = getCartId();

      const { data } = await axios.post(
        `${API_URL}/createOrder?checkoutId=${checkoutId}`
      );
      const orderId = data?.data?.id;
      setOrderId(orderId);
      dispatch('getPaymentMethodByOrder', orderId);
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in creating order');
    }
  },

  async getPaymentMethodByOrder({ commit }, orderId) {
    try {
      const { data } = await axios.get(
        `${API_URL}/getPaymentMethodByOrder?orderId=${orderId}`
      );
      commit('SET_PAYMENT_OPTIONS', data?.data);
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in getting payment method');
    }
  },
  async processPayment({ dispatch }, payment) {
    try {
      const orderId = getOrderId();

      await axios.post(`${API_URL}/processPayment?orderId=${orderId}`, {
        payment
      });
      dispatch('getCheckout');
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in processing pay');
    }
  },
  async addCoupons({ dispatch }, couponCode) {
    try {
      const checkoutId = getCartId();
      if (!couponCode)
        this.$toast.error('At least, you should input your coupon code');
      else {
        await axios.post(`${API_URL}/addCoupons`, {
          checkoutId,
          couponCode
        });
        dispatch('getCheckout');
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in adding coupons');
    }
  }
};
