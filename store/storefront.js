import axios from 'axios';
import { NETLIFY_API_URL } from '~/config/constants';

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
      const res = await axios.get(`${NETLIFY_API_URL}/storefront/status`);
      console.log(res.data);
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
