import axios from 'axios';
import {
  setUser,
  getUser,
  removeUserAndCookie,
  setCookie,
  getCookie
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
    axios
      .post(`/customerLogin`, {
        variables
      })
      .then(({ data }) => {
        if (data.status) {
          const user = setUser(data.body.data.customer);
          setCookie(data.body.cookie);
          commit('SET_CUSTOMER', user);
          dispatch('isLoggedIn');
        } else {
          this.$toast.error(data.message);
        }
        commit('SET_LOADING', false);
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
    commit('SET_LOADING', true);
    const cookie = getCookie();
    console.log(cookie);
    axios
      .post('/customerLogOut', {
        cookie
      })
      .then(({ data }) => {
        if (data.status) {
          commit('SET_LOGGEDIN', false);
          removeUserAndCookie();
        } else {
          this.$toast.error(data.message);
        }
        commit('SET_LOADING', false);
      });
  },
  async isLoggedIn({ commit }) {
    const user = getUser();
    commit('SET_LOGGEDIN', !!user);
    commit('SET_CUSTOMER', user);
  }
};
