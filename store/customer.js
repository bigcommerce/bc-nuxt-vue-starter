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
  async login({ dispatch, commit }, variables) {
    try {
      const { data } = await axios.post(`/customerLogin`, {
        variables
      });

      if (data.status) {
        const user = setUser(data.body.data.customer);
        setCookie(data.body.cookie);
        commit('SET_CUSTOMER', user);
        dispatch('isLoggedIn');
      } else {
        this.$toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  },
  async createCustomer({ commit }, variables) {
    try {
      const { data } = await axios.post(`/customerRegister`, {
        variables
      });

      if (data.status) {
        this.$toast.success(data.message);
        this.$router.push('/login');
      } else {
        this.$toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  },
  async logOut({ commit }) {
    try {
      const cookie = getCookie();
      const { data } = await axios.post('/customerLogOut', {
        cookie
      });

      if (data.status) {
        commit('SET_LOGGEDIN', false);
        removeUserAndCookie();
      } else {
        this.$toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  },
  isLoggedIn({ commit }) {
    const user = getUser();
    commit('SET_LOGGEDIN', !!user);
    commit('SET_CUSTOMER', user);
  }
};
