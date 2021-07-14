import axios from 'axios';
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
        `/getAllOrders?customerId=${customer.id}`
      );

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
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  }
};
