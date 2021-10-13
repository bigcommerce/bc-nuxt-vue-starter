import axios from 'axios';
import { API_URL } from '~/config/constants';
import { getSeo, setSeo } from '~/utils/storage';

export const state = () => ({
  seo: {},
  renderedRegions: []
});

export const getters = {
  seo(state) {
    return state.seo;
  },
  renderedRegions(state) {
    return state.renderedRegions;
  }
};

export const mutations = {
  SET_SEO(state, seo) {
    state.seo = seo;
  },
  SET_RENDERED_REGIONS(state, renderedRegions) {
    state.renderedRegions = renderedRegions;
  }
};

export const actions = {
  async getStorefrontSeo({ commit }) {
    try {
      const seo = getSeo();
      if (seo) {
        commit('SET_SEO', seo);
      } else {
        const {
          data: { data }
        } = await axios.get(`${API_URL}/storefront?field=seo`);
        commit('SET_SEO', data);
        setSeo(data);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getStorefrontStatus() {
    try {
      const { data } = await axios.get(`${API_URL}/storefront?field=status`);
      return data;
    } catch (error) {
      return null;
    }
  },
  async getHomePageContentWidgets({ commit }) {
    try {
      const { data } = await axios.get(`${API_URL}/getHomePageContentWidgets`);
      commit(
        'SET_RENDERED_REGIONS',
        data?.data?.site?.content?.renderedRegionsByPageType?.regions
      );
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in getting widgets');
    }
  }
};
