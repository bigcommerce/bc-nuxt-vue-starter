import axios from 'axios';

export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async getStorefrontSeo() {
    try {
      const { data } = await axios.get(`/getStorefrontSeo`);

      if (data.status) {
        return data.body?.data;
      } else {
        return {};
      }
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  async getStorefrontStatus() {
    try {
      const { data } = await axios.get(`/getStorefrontStatus`);
      if (data.status) {
        return data.body?.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return {};
    }
  }
};
