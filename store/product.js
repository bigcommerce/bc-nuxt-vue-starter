import axios from 'axios';
import { color } from '~/constants';

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

export const state = () => ({
  products: [],
  product: null,
  colors: [],
  selectedColor: null,
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
  colors(state) {
    return state.colors;
  },
  selectedColor(state) {
    return state.selectedColor;
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
  SET_COLORS(state, colors) {
    state.colors = colors;
  },
  SET_SELECTED_COLOR(state, selectedColor) {
    state.selectedColor = selectedColor;
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
  getProductBySlug({ commit }, slug) {
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
