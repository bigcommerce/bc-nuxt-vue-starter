import { setUser, getUser, removeUserAndCookie } from '~/helpers/auth';

export const state = () => ({
  customer: null,
  loggedIn: false
});

export const getters = {
  customer(state) {
    return state.customer;
  },
  loggedIn(state) {
    return state.loggedIn;
  }
};

export const mutations = {
  SET_CUSTOMER(state, customer) {
    state.customer = customer;
  },
  SET_LOGGEDIN(state, loggedIn) {
    state.loggedIn = loggedIn;
  }
};

export const actions = {
  async login({ dispatch }, variables) {
    await this.$axios.post('/graphql', {
      query: this.$queries.customerLogin(),
      variables
    });
    dispatch('getCustomer');
  },
  async getCustomer({ commit, dispatch }) {
    const result = await this.$axios.post('/graphql', {
      query: this.$queries.getCustomer()
    });
    setUser(JSON.stringify(result.data.data.customer));
    commit('SET_CUSTOMER', result.data.data.customer);
    dispatch('isLoggedIn');
  },
  async logOut({ commit }) {
    removeUserAndCookie();
    commit('SET_LOGGEDIN', false);
  },
  async isLoggedIn({ commit }) {
    const user = getUser();
    commit('SET_LOGGEDIN', !!user);
    commit('SET_CUSTOMER', user);
  }
};
