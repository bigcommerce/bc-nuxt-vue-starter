/* eslint-disable camelcase */
import axios from 'axios';
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
          `/getCheckout?checkoutId=${checkoutId}`
        );

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
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
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
        `setConsignmentToCheckout?checkoutId=${checkoutId}`,
        {
          consignment
        }
      );
      if (data.status) {
        this.$toast.success(data.message);
        const body = data.body;
        const consignment = body?.data?.consignments[0];
        commit('SET_CONSIGNMENTID', consignment.id);
        dispatch('getCheckout');
      } else {
        this.$toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
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

      const {
        data
      } = await axios.put(
        `updateConsignmentToCheckout?checkoutId=${checkoutId}&consignmentId=${consignmentId}`,
        { consignment }
      );

      if (data.status) {
        if (getters.shippingMethod?.id) {
          await dispatch('updateShippingOption', {
            shippingOptionId: getters.shippingMethod.id,
            consignmentId
          });
        }
        commit('SET_CONSIGNMENTID', consignmentId);
      } else {
        this.$toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
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

      const { data } = await axios.post(
        `setBillingAddressToCheckout?checkoutId=${checkoutId}`,
        {
          data: billingAddress
        }
      );

      if (data.status) {
        await dispatch('updateShippingOption', {
          shippingOptionId,
          consignmentId
        });
        if (orderId) dispatch('getPaymentMethodByOrder', orderId);
        else dispatch('createOrder');
      } else {
        this.$toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  },

  async updateShippingOption(
    { dispatch },
    { shippingOptionId, consignmentId }
  ) {
    try {
      const checkoutId = getCartId();
      const { data } = await axios.put(
        `updateShippingOption?checkoutId=${checkoutId}&consignmentId=${consignmentId}&shippingOptionId=${shippingOptionId}`
      );
      if (data.status) {
        dispatch('getCheckout');
      } else {
        this.$toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  },

  async createOrder({ dispatch }) {
    try {
      const checkoutId = getCartId();

      const { data } = await axios.post(`createOrder?checkoutId=${checkoutId}`);

      if (data.status) {
        const orderId = data.body.data.id;
        setOrderId(orderId);
        dispatch('getPaymentMethodByOrder', orderId);
      } else {
        this.$toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  },

  async getPaymentMethodByOrder({ commit }, orderId) {
    try {
      const { data } = await axios.get(
        `getPaymentMethodByOrder?orderId=${orderId}`
      );

      if (data.status) {
        commit('SET_PAYMENT_OPTIONS', data.body?.data);
      } else {
        this.$toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  },
  async processPayment({ dispatch }, payment) {
    try {
      const orderId = getOrderId();

      const { data } = await axios.post(`processPayment?orderId=${orderId}`, {
        payment
      });

      if (data.status) {
        dispatch('getCheckout');
      } else {
        this.$toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  },
  async addCoupons({ dispatch }, couponCode) {
    try {
      const checkoutId = getCartId();
      if (!couponCode)
        this.$toast.error('At least, you should input your coupon code');
      else {
        const { data } = await axios.post(`addCoupons`, {
          checkoutId,
          couponCode
        });

        if (data.status) {
          dispatch('getCheckout');
        } else {
          this.$toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  }
};
