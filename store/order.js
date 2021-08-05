import axios from 'axios';
import { API_URL } from '~/config/constants';
import { getSecuredData, getUser } from '~/utils/auth';

export const state = () => ({
  orders: []
});

export const getters = {
  orders(state) {
    return state.orders;
  }
};

export const mutations = {
  SET_ORDERS(state, orders) {
    state.orders = orders;
  }
};

export const actions = {
  async getAllOrders({ commit }) {
    try {
      const user = getUser();
      const customer = getSecuredData(user.secureData);

      const { data } = await axios.get(
        `${API_URL}/getAllOrders?customerId=${customer.id}`
      );

      let orders = [];
      if (data) {
        orders = data.map((item) => {
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
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in getting orders');
    }
  }
};
