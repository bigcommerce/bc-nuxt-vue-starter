import axios from 'axios';
import { getSecuredData, getUser } from '~/utils/auth';

export const state = () => ({
  isLoading: false,
  orders: []
});

export const getters = {
  isLoading(state) {
    return state.isLoading;
  },
  orders(state) {
    return state.orders;
  }
};

export const mutations = {
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
  SET_ORDERS(state, orders) {
    state.orders = orders;
  }
};

export const actions = {
  getAllOrders({ commit }) {
    commit('SET_LOADING', true);
    const user = getUser();
    const customer = getSecuredData(user.secureData);
    axios.get(`/getAllOrders?customerId=${customer.id}`).then(({ data }) => {
      if (data.status) {
        let orders = [];
        if (data.body) {
          orders = data.body.map((item) => {
            return [
              `#${item.id}`,
              item.date_modified,
              item.payment_method,
              Number.parseFloat(item.total_inc_tax).toFixed(2),
              item.status
            ];
          });
        }
        commit('SET_ORDERS', orders);
      } else {
        this.$toast.error(data.message);
      }
      commit('SET_LOADING', false);
    });
  }
};
