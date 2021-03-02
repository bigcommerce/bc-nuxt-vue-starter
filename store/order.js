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
    this.$axios
      .$get(
        `/api/stores/${process.env.storeHash}/v2/orders?customer_id=${customer.id}&channel_id=${process.env.channelId}`
      )
      .then((response) => {
        let orders = [];
        if (response) {
          orders = response.map((item) => {
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
        commit('SET_LOADING', false);
      })
      .catch(() => {
        this.$toast.error('Getting orders failed');
        commit('SET_LOADING', false);
      });
  }
};
