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
    this.$axios
      .$get(
        `/api/stores/${process.env.storeHash}/v2/customers/${customer.id}/addresses`
      )
      .then((response) => {
        if (response) {
          const addresses = response.map((item) => ({
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
        }
        commit('SET_LOADING', false);
      })
      .catch(() => {
        this.$toast.error('Getting customer addresses failed');
        commit('SET_LOADING', false);
      });
  },
  updateAddress({ commit, dispatch }, address) {
    commit('SET_LOADING', true);
    const customerId = address.customer_id;
    const id = address.id;
    delete address.id;
    this.$axios
      .$put(
        `/api/stores/${process.env.storeHash}/v2/customers/${customerId}/addresses/${id}`,
        { ...address }
      )
      .then((response) => {
        if (response) {
          dispatch('getAllAddresses');
        }
        commit('SET_LOADING', false);
      })
      .catch(() => {
        this.$toast.error('Updating customer address failed');
        commit('SET_LOADING', false);
      });
  },
  addAddress({ commit, dispatch }, address) {
    const user = getUser();
    const customer = getSecuredData(user.secureData);
    commit('SET_LOADING', true);
    delete address.id;
    delete address.customer_id;
    this.$axios
      .$post(
        `/api/stores/${process.env.storeHash}/v2/customers/${customer.id}/addresses`,
        { ...address }
      )
      .then((response) => {
        if (response) {
          dispatch('getAllAddresses');
        }
        commit('SET_LOADING', false);
      })
      .catch(() => {
        this.$toast.error('Adding customer address failed');
        commit('SET_LOADING', false);
      });
  },
  deleteAddress({ commit, dispatch }, { customerId, addressId }) {
    commit('SET_LOADING', true);
    this.$axios
      .$delete(
        `/api/stores/${process.env.storeHash}/v2/customers/${customerId}/addresses/${addressId}`
      )
      .then(() => {
        dispatch('getAllAddresses');
        commit('SET_LOADING', false);
      })
      .catch(() => {
        this.$toast.error('Deleting customer address failed');
        commit('SET_LOADING', false);
      });
  }
};
