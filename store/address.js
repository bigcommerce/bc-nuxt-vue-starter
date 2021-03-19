import axios from 'axios';
import { getSecuredData, getUser } from '~/utils/auth';

export const state = () => ({
  isLoading: false,
  addresses: []
});

export const getters = {
  isLoading(state) {
    return state.isLoading;
  },
  addresses(state) {
    return state.addresses;
  }
};

export const mutations = {
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
  SET_ADDRESSES(state, addresses) {
    state.addresses = addresses;
  }
};

export const actions = {
  getAllAddresses({ commit, state }) {
    commit('SET_LOADING', true);
    const user = getUser();
    const customer = getSecuredData(user.secureData);
    axios.get(`/getAllAddresses?customerId=${customer.id}`).then(({ data }) => {
      if (data.status) {
        let addresses = [];
        if (data.body) {
          addresses = data.body.map((item) => ({
            address_type: item.address_type,
            city: item.city,
            company: item.company,
            country: item.country,
            customer_id: item.customer_id,
            first_name: item.first_name,
            id: item.id,
            last_name: item.last_name,
            phone: item.phone,
            state: item.state,
            street_1: item.street_1,
            street_2: item.street_2,
            zip: item.zip
          }));
        }
        commit('SET_ADDRESSES', addresses);
      } else {
        this.$toast.error(data.message);
      }
      commit('SET_LOADING', false);
    });
  },
  updateAddress({ commit, dispatch }, address) {
    commit('SET_LOADING', true);
    const customerId = address.customer_id;
    const id = address.id;
    delete address.id;
    axios
      .put(`/updateAddress?customerId=${customerId}&addressId=${id}`, {
        address
      })
      .then(({ data }) => {
        if (data.status) {
          dispatch('getAllAddresses');
          this.$toast.info(data.message);
        } else {
          this.$toast.error(data.message);
        }
        commit('SET_LOADING', false);
      });
  },
  addAddress({ commit, dispatch }, address) {
    const user = getUser();
    const customer = getSecuredData(user.secureData);
    commit('SET_LOADING', true);
    delete address.id;
    delete address.customer_id;
    axios
      .post(`/addAddress?customerId=${customer.id}`, { address })
      .then(({ data }) => {
        if (data.status) {
          dispatch('getAllAddresses');
          this.$toast.info(data.message);
        } else {
          this.$toast.error(data.message);
        }
        commit('SET_LOADING', false);
      });
  },
  deleteAddress({ commit, dispatch }, { customerId, addressId }) {
    commit('SET_LOADING', true);
    axios
      .delete(`/deleteAddress?customerId=${customerId}&addressId=${addressId}`)
      .then(({ data }) => {
        if (data.status) {
          dispatch('getAllAddresses');
          this.$toast.info(data.message);
        } else {
          this.$toast.error(data.message);
        }
        commit('SET_LOADING', false);
      });
  }
};
