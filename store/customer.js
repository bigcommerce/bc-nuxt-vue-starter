import {
  setUser,
  getUser,
  removeUserAndCookie,
  bigCommerce
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
    bigCommerce
      .post('/graphql', {
        query: this.$queries.customerLogin(),
        variables
      })
      .then(() => {
        dispatch('getCustomer');
      })
      .catch(() => {
        commit('SET_LOADING', false);
        this.$toast.error('Invalide credentials');
      });
  },
  getCustomer({ commit, dispatch }) {
    bigCommerce
      .post('/graphql', {
        query: this.$queries.getCustomer()
      })
      .then((response) => {
        const user = setUser(response.data.data.customer);
        commit('SET_LOADING', false);
        commit('SET_CUSTOMER', user);
        dispatch('isLoggedIn');
      })
      .catch(() => {
        commit('SET_LOADING', false);
        this.$toast.error('Can not get customer info');
      });
  },
  createCustomer({ commit }, data) {
    commit('SET_LOADING', true);
    this.$axios
      .$post(`/api/stores/${process.env.storeHash}/v2/customers`, {
        ...data
      })
      .then(() => {
        commit('SET_LOADING', false);
        this.$toast.info('Successfully registered.');
        this.$router.push('/login');
      })
      .catch(() => {
        this.$toast.error('Customer create error.');
        commit('SET_LOADING', false);
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
