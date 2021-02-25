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
  }
};
