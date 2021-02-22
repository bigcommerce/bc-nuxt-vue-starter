/* eslint-disable camelcase */
import { getCartCheckoutRedirectUrl, getUser } from '~/utils/auth';
const productFilter = (cart) => {
  return cart && cart !== ''
    ? cart.data.line_items.physical_items.map((item) => ({
        itemId: item.id,
        id: item.product_id,
        variant_id: item.variant_id,
        title: item.name,
        image: item.image_url,
        price: { regular: item.sale_price },
        configuration: [
          /* { name: 'Size', value: 'XS' },
            { name: 'Color', value: 'White' }
            Example configuration */
        ],
        qty: item.quantity
      }))
    : [];
};

export const state = () => ({
  products: [],
  redirectUrls: {},
  isLoading: false
});

export const getters = {
  products(state) {
    return state.products;
  },
  redirectUrls(state) {
    return state.redirectUrls;
  },
  isLoading(state) {
    return state.isLoading;
  }
};

export const mutations = {
  SET_CART(state, products) {
    state.products = products;
  },
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
  SET_REDIRECTURLS(state, redirectUrls) {
    state.redirectUrls = redirectUrls;
  }
};

export const actions = {
  addToCart({ dispatch }, data) {
    const cartId = window.localStorage.getItem('cartId');
    if (cartId) dispatch('addCartItem', data);
    else dispatch('createCart', data);
  },

  createCart({ commit }, createData) {
    commit('SET_LOADING', true);
    const data = {
      line_items: [{ ...createData }],
      channel_id: `${process.env.CHANNEL_ID}`
    };
    this.$axios
      .$post(
        `/api/stores/${process.env.storeHash}/v3/carts?include=redirect_urls`,
        data
      )
      .then((response) => {
        const cartId = response.data.id;
        window.localStorage.setItem('cartId', cartId);
        this.$toast.info('Successfully created cart!');
        commit('SET_CART', productFilter(response));
        commit('SET_REDIRECTURLS', response.data.redirect_urls);
        commit('SET_LOADING', false);
      })
      .catch(() => {
        commit('SET_LOADING', false);
      });
  },

  addCartItem({ commit }, addData) {
    const cartId = window.localStorage.getItem('cartId');
    const data = { line_items: [{ ...addData }] };
    commit('SET_LOADING', true);
    this.$axios
      .$post(
        `/api/stores/${process.env.storeHash}/v3/carts/${cartId}/items?include=redirect_urls`,
        data
      )
      .then((response) => {
        this.$toast.info('Successfully added a item to cart!');
        commit('SET_LOADING', false);
        commit('SET_CART', productFilter(response));
        commit('SET_REDIRECTURLS', response.data.redirect_urls);
      })
      .catch(() => {
        commit('SET_LOADING', false);
      });
  },

  updateCartItem({ commit }, { updateData, item_id }) {
    const cartId = window.localStorage.getItem('cartId');
    const data = { line_item: { ...updateData } };
    commit('SET_LOADING', true);
    this.$axios
      .$put(
        `/api/stores/${process.env.storeHash}/v3/carts/${cartId}/items/${item_id}?include=redirect_urls`,
        data
      )
      .then((response) => {
        this.$toast.info('Successfully updated cart item!');
        commit('SET_CART', productFilter(response));
        commit('SET_REDIRECTURLS', response.data.redirect_urls);
        commit('SET_LOADING', false);
      })
      .catch(() => {
        commit('SET_LOADING', false);
      });
  },

  deleteCartItem({ commit }, itemId) {
    const cartId = window.localStorage.getItem('cartId');
    commit('SET_LOADING', true);
    this.$axios
      .$delete(
        `/api/stores/${process.env.storeHash}/v3/carts/${cartId}/items/${itemId}?include=redirect_urls`
      )
      .then((response) => {
        const cart = productFilter(response);
        this.$toast.info('Successfully deleted a item from cart');
        commit('SET_LOADING', false);
        commit('SET_CART', cart);
        commit(
          'SET_REDIRECTURLS',
          response ? response.data.redirect_urls : null
        );
        if (cart.length === 0) window.localStorage.removeItem('cartId');
      })
      .catch(() => {
        commit('SET_LOADING', false);
      });
  },

  getCart({ commit }) {
    const cartId = window.localStorage.getItem('cartId');
    if (cartId)
      this.$axios
        .$get(
          `/api/stores/${process.env.storeHash}/v3/carts/${cartId}?include=redirect_urls`
        )
        .then((cart) => {
          commit('SET_CART', productFilter(cart));
          commit('SET_REDIRECTURLS', cart.data.redirect_urls);
        })
        .catch(() => {
          window.localStorage.removeItem('cartId');
          commit('SET_CART', productFilter(null));
        });
  },

  async cartCheckout({ state }) {
    const user = getUser();
    if (user) {
      window.location = getCartCheckoutRedirectUrl(
        state.redirectUrls.checkout_url
      );
    } else window.location = state.redirectUrls.checkout_url;
  }
};
