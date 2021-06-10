/* eslint-disable camelcase */
import axios from 'axios';

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
  getCategories({ commit }) {
    axios.get(`/getCategories`).then(({ data }) => {
      if (data.status) {
        commit('SET_CATEGORIES', data.body?.data?.site?.categoryTree);
      } else {
        this.$toast.error(data.message);
      }
    });
  },
  getProductsByCategory({ commit, getters }, data) {
    let path = data?.path;
    const page = data?.page;
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

    axios
      .get(`/getProductsByCategory?path=${path}&pageParam=${pageParam}`)
      .then(({ data }) => {
        if (data.status) {
          const products = data.body?.data?.site?.route?.node?.products?.edges.map(
            ({ node }) => ({
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
            })
          );
          const pageInfo =
            data.body?.data?.site?.route?.node?.products?.pageInfo;
          commit('SET_START_CURSOR', pageInfo.startCursor);
          commit('SET_END_CURSOR', pageInfo.endCursor);
          commit('SET_PRODUCTS', products);
        } else {
          this.$toast.error(data.message);
        }
      });
  },
  getProductBySlug({ dispatch }, slug) {
    axios.get(`/getProductBySlug?slug=${slug}`).then(({ data }) => {
      if (data.status) {
        const product = data.body.data?.site?.route?.node;
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
      } else {
        this.$toast.error(data.message);
      }
    });
  },
  getProductOption({ commit }, product) {
    axios
      .get(`/getProductOption?productId=${product.entityId}`)
      .then(({ data }) => {
        if (data.status) {
          const result = data.body.data;
          product.options = getProductOptions(result.options);
          product.variants = getProductVariants(result.variants);
          product.modifiers = getProductModifiers(result.modifiers);
          commit('SET_PRODUCT', product);
        } else {
          this.$toast.error(data.message);
        }
      });
  },
  searchProductByKey({ commit, state }, key) {
    axios.get(`/searchProductByKey?key=${key}`).then(({ data }) => {
      if (data.status) {
        const products = data.body.data.map((item) => ({
          path: item.custom_url?.url,
          name: item.name,
          image:
            item.primary_image?.url_standard ??
            '/assets/storybook/SfProductCard/no-product.jpg'
        }));
        commit('SET_SEARCHED_PRODUCTS', products);
      } else {
        this.$toast.error(data.message);
      }
    });
  }
};
