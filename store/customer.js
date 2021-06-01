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
  login({ dispatch, commit }, variables) {
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
  createCustomer({ commit }, variables) {
    axios
      .post(`/customerRegister`, {
        variables
      })
      .then(({ data }) => {
        if (data.status) {
          this.$toast.success(data.message);
          this.$router.push('/login');
        } else {
          this.$toast.error(data.message);
        }
        commit('SET_LOADING', false);
      });
  },
  async logOut({ commit }) {
    const cookie = getCookie();
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
