import axios from 'axios';
import { color } from '~/constants';

export const state = () => ({
  products: [],
  product: null,
  colors: [],
  isLoading: false,
  selectedColor: null,
  categories: [],
  category: '/shop-all/',
  startCursor: '',
  endCursor: '',
  showOnPage: 10
});

export const getters = {
  products(state) {
    return state.products;
  },
  product(state) {
    return state.product;
  },
  colors(state) {
    return state.colors;
  },
  selectedColor(state) {
    return state.selectedColor;
  },
  isLoading(state) {
    return state.isLoading;
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
  }
};

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_PRODUCT(state, product) {
    state.product = product;
  },
  SET_COLORS(state, colors) {
    state.colors = colors;
  },
  SET_SELECTED_COLOR(state, selectedColor) {
    state.selectedColor = selectedColor;
  },
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
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
  }
};

export const actions = {
  getCategories({ commit }) {
    commit('SET_LOADING', true);
    axios.get(`/getCategories`).then(({ data }) => {
      if (data.status) {
        commit('SET_CATEGORIES', data.body?.data?.site?.categoryTree);
      } else {
        this.$toast.error(data.message);
      }
      commit('SET_LOADING', false);
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
    commit('SET_LOADING', true);
    axios
      .get(`/getProductsByCategory?path=${path}&pageParam=${pageParam}`)
      .then(({ data }) => {
        if (data.status) {
          const checkCartOnPage = (edges) => {
            let flag = false;
            // eslint-disable-next-line no-unreachable-loop
            for (let index = 0; index < edges.length; index++) {
              const { node } = edges[index];
              if (node.options.edges.length > 0) {
                flag = true;
                break;
              } else {
                flag = false;
                break;
              }
            }
            return flag;
          };
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
          product.sizes = filterOption('Size');
          product.rating = {
            reviews: product.reviewSummary.numberOfReviews,
            rate:
              product.reviewSummary.summationOfRatings /
              product.reviewSummary.numberOfReviews,
            max: 5
          };
          commit('SET_COLORS', filterOption('Color'));
          commit('SET_PRODUCT', product);
        }
      } else {
        this.$toast.error(data.message);
      }
      commit('SET_LOADING', false);
    });
  },
  setColor({ commit, getters }, colorIndex) {
    const colors = getters.colors.map((item) => Object.assign({}, item));
    // eslint-disable-next-line array-callback-return
    colors.map((el) => {
      if (colorIndex === el.id) {
        el.selected = true;
        commit('SET_SELECTED_COLOR', el.id);
      } else {
        el.selected = false;
      }
    });
    commit('SET_COLORS', colors);
  }
};
