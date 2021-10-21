import axios from 'axios';
import { API_URL } from '~/config/constants';
import { setUser, getUser } from '~/utils/auth';
import { getCookie, removeUserAndCookie, setCookie } from '~/utils/storage';

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
  async login({ dispatch, commit }, variables) {
    try {
      const { data } = await axios.post(`${API_URL}/customerLogin`, {
        variables
      });

      const user = setUser(data.data.customer);
      setCookie(data.cookie);
      commit('SET_CUSTOMER', user);
      dispatch('isLoggedIn');
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in login');
    }
  },
  async createCustomer({ commit }, variables) {
    try {
      await axios.post(`${API_URL}/customerRegister`, {
        variables
      });
      this.$toast.success('Successfully registered!');
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in register');
    }
  },
  async logOut({ commit }) {
    try {
      const cookie = getCookie();
      await axios.post(`${API_URL}/customerLogOut`, {
        cookie
      });

      commit('SET_LOGGEDIN', false);
      removeUserAndCookie();
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in logout');
    }
  },
  isLoggedIn({ commit }) {
    const user = getUser();
    commit('SET_LOGGEDIN', !!user);
    commit('SET_CUSTOMER', user);
  }
};
