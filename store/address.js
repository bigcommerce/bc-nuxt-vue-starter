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
  async getAllAddresses({ commit }) {
    try {
      const user = getUser();
      const customer = getSecuredData(user.secureData);
      const { data } = await axios.get(
        `/getAllAddresses?customerId=${customer.id}`
      );
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
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  },
  async updateAddress({ dispatch }, address) {
    try {
      const customerId = address.customer_id;
      const id = address.id;
      delete address.id;
      const { data } = await axios.put(
        `/updateAddress?customerId=${customerId}&addressId=${id}`,
        {
          address
        }
      );
      if (data.status) {
        dispatch('getAllAddresses');
        this.$toast.success(data.message);
      } else {
        this.$toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  },
  async addAddress({ dispatch }, address) {
    try {
      const user = getUser();
      const customer = getSecuredData(user.secureData);
      delete address.id;
      delete address.customer_id;
      const { data } = await axios.post(
        `/addAddress?customerId=${customer.id}`,
        { address }
      );
      if (data.status) {
        dispatch('getAllAddresses');
        this.$toast.success(data.message);
      } else {
        this.$toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  },
  async deleteAddress({ dispatch }, { customerId, addressId }) {
    try {
      const { data } = await axios.delete(
        `/deleteAddress?customerId=${customerId}&addressId=${addressId}`
      );
      if (data.status) {
        dispatch('getAllAddresses');
        this.$toast.success(data.message);
      } else {
        this.$toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  }
};
