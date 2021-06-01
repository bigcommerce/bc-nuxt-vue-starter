import axios from 'axios';
import { getSecuredData, getUser } from '~/utils/auth';

export const state = () => ({
  addresses: []
});

export const getters = {
  addresses(state) {
    return state.addresses;
  }
};

export const mutations = {
  SET_ADDRESSES(state, addresses) {
    state.addresses = addresses;
  }
};

export const actions = {
  getAllAddresses({ commit }) {
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
    });
  },
  updateAddress({ dispatch }, address) {
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
          this.$toast.success(data.message);
        } else {
          this.$toast.error(data.message);
        }
      });
  },
  addAddress({ dispatch }, address) {
    const user = getUser();
    const customer = getSecuredData(user.secureData);
    delete address.id;
    delete address.customer_id;
    axios
      .post(`/addAddress?customerId=${customer.id}`, { address })
      .then(({ data }) => {
        if (data.status) {
          dispatch('getAllAddresses');
          this.$toast.success(data.message);
        } else {
          this.$toast.error(data.message);
        }
      });
  },
  deleteAddress({ dispatch }, { customerId, addressId }) {
    axios
      .delete(`/deleteAddress?customerId=${customerId}&addressId=${addressId}`)
      .then(({ data }) => {
        if (data.status) {
          dispatch('getAllAddresses');
          this.$toast.success(data.message);
        } else {
          this.$toast.error(data.message);
        }
      });
  }
};
