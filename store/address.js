import axios from 'axios';
import { API_URL } from '~/config/constants';
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
        `${API_URL}/getAllAddresses?customerId=${customer.id}`
      );
      const addresses = data.map((item) => ({
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
      commit('SET_ADDRESSES', addresses);
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in getting addresses');
    }
  },
  async updateAddress({ dispatch }, address) {
    try {
      const customerId = address.customer_id;
      const id = address.id;
      delete address.id;
      const { data } = await axios.put(
        `${API_URL}/updateAddress?customerId=${customerId}&addressId=${id}`,
        {
          address
        }
      );
      dispatch('getAllAddresses');
      this.$toast.success(data.message);
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in updating address');
    }
  },
  async addAddress({ dispatch }, address) {
    try {
      const user = getUser();
      const customer = getSecuredData(user.secureData);
      delete address.id;
      delete address.customer_id;
      await axios.post(`${API_URL}/addAddress?customerId=${customer.id}`, {
        address
      });
      dispatch('getAllAddresses');
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in adding address');
    }
  },
  async deleteAddress({ dispatch }, { customerId, addressId }) {
    try {
      await axios.delete(
        `/deleteAddress?customerId=${customerId}&addressId=${addressId}`
      );
      dispatch('getAllAddresses');
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in deleting address');
    }
  }
};
