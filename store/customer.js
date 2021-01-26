import {
  setUser,
  getUser,
  removeUserAndCookie,
  customerApi
} from '~/utils/auth';

export const state = () => ({
  customer: null,
  loggedIn: false,
  isLoading: false
});

export const getters = {
  customer(state) {
    return state.customer;
  },
  loggedIn(state) {
    return state.loggedIn;
  },
  isLoading(state) {
    return state.isLoading;
  }
};

export const mutations = {
  SET_CUSTOMER(state, customer) {
    state.customer = customer;
  },
  SET_LOGGEDIN(state, loggedIn) {
    state.loggedIn = loggedIn;
  },
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  }
};

export const actions = {
  login({ dispatch, commit }, variables) {
    commit('SET_LOADING', true);
    customerApi
      .post(null, {
        query: this.$queries.customerLogin(),
        variables
      })
      .then(() => {
        this.$toast.info('Successfully logged in!.');
      })
      .catch(() => {
        commit('SET_LOADING', false);
        this.$toast.error('Invalide credentials');
      });
    dispatch('getCustomer');
  },
  getCustomer({ commit, dispatch }) {
    customerApi
      .post(null, {
        query: this.$queries.getCustomer()
      })
      .then((response) => {
        const user = setUser(response.data.data.customer);
        commit('SET_LOADING', false);
        console.log(response);
        commit('SET_CUSTOMER', user);
        dispatch('isLoggedIn');
      })
      .catch(() => {
        commit('SET_LOADING', false);
        this.$toast.error('Can not get customer info');
      });
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
