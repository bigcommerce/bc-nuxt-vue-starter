/* eslint-disable camelcase */
import axios from 'axios';
import { API_URL } from '~/config/constants';

const checkCartOnPage = (edges) => {
  return !!edges.find(
    ({
      node: {
        options: { edges }
      }
    }) => edges.length
  );
};

const getProductOptions = (options) => {
  const ops = options.map(({ display_name, option_values }) => ({
    field: display_name,
    values: option_values.map(({ id, label, value_data }) => {
      const additionalField = {};
      if (display_name.toLowerCase() === 'color') {
        additionalField.color = value_data?.colors[0];
        additionalField.selected = false;
      }
      return {
        id,
        label,
        ...additionalField
      };
    })
  }));
  return ops;
};

const getProductVariants = (variants) => {
  const vts = variants.map(({ id, option_values }) => ({
    id,
    values: option_values
  }));
  return vts;
};

const getProductModifiers = (modifiers) => {
  const mds = modifiers.map(({ id, display_name, option_values }) => ({
    id,
    display_name,
    values: option_values.map(({ id, option_id, label }) => ({
      id,
      option_id,
      label
    }))
  }));
  return mds;
};

export const state = () => ({
  loading: true,
  products: [],
  product: null,
  categories: [],
  category: '/shop-all/',
  startCursor: '',
  endCursor: '',
  showOnPage: 10,
  searchedProducts: []
});

export const getters = {
  loading(state) {
    return state.loading;
  },
  products(state) {
    return state.products;
  },
  product(state) {
    return state.product;
  },
  categories(state) {
    return state.categories;
  },
  category(state) {
    return state.category;
  },
  startCursor(state) {
    return state.startCursor;
  },
  endCursor(state) {
    return state.endCursor;
  },
  showOnPage(state) {
    return state.showOnPage;
  },
  searchedProducts(state) {
    return state.searchedProducts;
  }
};

export const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_PRODUCT(state, product) {
    state.product = product;
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_CATEGORY(state, category) {
    state.category = category;
  },
  SET_START_CURSOR(state, startCursor) {
    state.startCursor = startCursor;
  },
  SET_END_CURSOR(state, endCursor) {
    state.endCursor = endCursor;
  },
  SET_SHOW_ON_PAGE(state, showOnPage) {
    state.showOnPage = showOnPage;
  },
  SET_SEARCHED_PRODUCTS(state, searchedProducts) {
    state.searchedProducts = searchedProducts;
  }
};

export const actions = {
  async getCategories({ commit }) {
    try {
      const { data } = await axios.get(`${API_URL}/getCategories`);
      commit('SET_CATEGORIES', data?.data?.site?.categoryTree);
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in getting categories');
    }
  },
  async getProductsByCategory({ commit, getters }, pageInfo) {
    try {
      let path = pageInfo?.path;
      const page = pageInfo?.page;
      let pageParam = null;

      if (!page) {
        pageParam = `after: "", first: ${getters.showOnPage}`;
      } else if (page === 'next') {
        pageParam = `after: "${getters.endCursor}", first: ${getters.showOnPage}`;
      } else if (page === 'prev') {
        pageParam = `before: "${getters.startCursor}", last: ${getters.showOnPage}`;
      }
      if (typeof path !== 'undefined') commit('SET_CATEGORY', path);
      else path = getters.category;

      const { data } = await axios.get(
        `${API_URL}/getProductsByCategory?path=${path}&pageParam=${pageParam}`
      );
      const productResult = data?.data?.site?.route?.node?.products;
      const products = productResult?.edges.map(({ node }) => ({
        path: node.path,
        title: node.name,
        id: node.entityId,
        description: node.description,
        image:
          node.defaultImage?.url ??
          '/assets/storybook/SfProductCard/no-product.jpg',
        price: {
          regular: `${node.prices?.price?.currencyCode} ${node.prices?.price?.value}`
        },
        rating: {
          max: 5,
          score:
            node.reviewSummary?.summationOfRatings /
            node.reviewSummary?.numberOfReviews
        },
        reviewsCount: node.reviewSummary?.numberOfReviews,
        isCartableOnCategoryPage: checkCartOnPage(node?.variants?.edges)
      }));
      const pInfo = productResult?.pageInfo;
      commit('SET_START_CURSOR', pInfo.startCursor);
      commit('SET_END_CURSOR', pInfo.endCursor);
      commit('SET_PRODUCTS', products);
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in getting products');
    }
  },
  async getProductBySlug({ dispatch, commit }, slug) {
    try {
      commit('SET_LOADING', true);
      const { data } = await axios.get(
        `${API_URL}/getProductBySlug?slug=${slug}`
      );

      const product = data?.data?.site?.route?.node;
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
        product.rating = {
          reviews: product.reviewSummary?.numberOfReviews,
          rate: !product.reviewSummary?.numberOfReviews
            ? 0
            : product.reviewSummary?.summationOfRatings /
              product.reviewSummary?.numberOfReviews,
          max: 5
        };
        dispatch('getProductOption', product);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in getting product');
      commit('SET_LOADING', false);
    }
  },
  async getProductOption({ commit }, product) {
    try {
      const { data } = await axios.get(
        `${API_URL}/getProductOption?productId=${product.entityId}`
      );

      const result = data?.data;
      product.options = getProductOptions(result?.options);
      product.variants = getProductVariants(result?.variants);
      product.modifiers = getProductModifiers(result?.modifiers);
      commit('SET_PRODUCT', product);
      commit('SET_LOADING', false);
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in getting product option');
      commit('SET_LOADING', true);
    }
  },
  async searchProductByKey({ commit }, key) {
    try {
      const { data } = await axios.get(
        `${API_URL}/searchProductByKey?key=${key}`
      );

      const products = data?.data?.map((item) => ({
        path: item.custom_url?.url,
        name: item.name,
        image:
          item.primary_image?.url_standard ??
          '/assets/storybook/SfProductCard/no-product.jpg'
      }));
      commit('SET_SEARCHED_PRODUCTS', products);
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  }
};
