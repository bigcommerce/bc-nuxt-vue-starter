import axios from 'axios';
import { color } from '~/constants';

export const state = () => ({
  products: [],
  product: null,
  isLoading: false
});

export const getters = {
  products(state) {
    return state.products;
  },
  product(state) {
    return state.product;
  },
  isLoading(state) {
    return state.isLoading;
  }
};

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_PRODUCT(state, product) {
    state.product = product;
  },
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  }
};

export const actions = {
  getShopAll({ commit }) {
    commit('SET_LOADING', true);
    axios.get('/shopAll').then(({ data }) => {
      if (data.status) {
        commit(
          'SET_PRODUCTS',
          data.body?.data?.site?.route?.node?.products?.edges
        );
      } else {
        this.$toast.error(data.message);
      }
      commit('SET_LOADING', false);
    });
  },
  getProductBySlug({ commit }, slug) {
    commit('SET_LOADING', true);
    axios.get(`/getProductBySlug?slug=${slug}`).then(({ data }) => {
      if (data.status) {
        const product = data.body.data?.site?.route?.node;
        const filterOption = (option) => {
          return (
            product.options?.edges
              ?.find(({ node }) => node.displayName === option)
              ?.node?.values?.edges?.map(({ node }) => ({
                id: node.entityId,
                value: option === 'Color' ? color[node.label] : node.label,
                selected: false
              })) ?? []
          );
        };

        if (product != null) {
          product.images = product.images.edges.map((t) => {
            return {
              mobile: { url: t.node.mobile },
              desktop: { url: t.node.desktop },
              big: { url: t.node.big },
              alt: t.node.altText
            };
          });
          product.price = `$${product.prices?.price?.value.toFixed(2)}`;
          product.colors = filterOption('Color');
          product.sizes = filterOption('Size');
          product.rating = {
            reviews: product.reviewSummary.numberOfReviews,
            rate:
              product.reviewSummary.summationOfRatings /
              product.reviewSummary.numberOfReviews,
            max: 5
          };
        }
        commit('SET_PRODUCT', product);
      } else {
        this.$toast.error(data.message);
      }
      commit('SET_LOADING', false);
    });
  }
};
