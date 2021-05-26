/* eslint-disable camelcase */
import axios from 'axios';
import { CHECKOUT_TYPE } from '~/constants/checkouttype';
import {
  getCartCheckoutRedirectUrl,
  getSecuredData,
  getUser
} from '~/utils/auth';
import { getCartId } from '~/utils/storage';
const productFilter = (cart) => {
  return cart && cart !== ''
    ? cart.data.line_items.physical_items.map((item) => ({
        itemId: item.id,
        id: item.product_id,
        variant_id: item.variant_id,
        title: item.name,
        image: item.image_url,
        price: { regular: item.sale_price },
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
    const cartId = getCartId();
    if (cartId) dispatch('addCartItem', data);
    else dispatch('createCart', data);
  },

  createCart({ commit }, createData) {
    commit('SET_LOADING', true);
    const cartData = {
      line_items: [{ ...createData }],
      channel_id: `${process.env.CHANNEL_ID}`
    };
    axios.post(`/createCart`, { cartData }).then(({ data }) => {
      if (data.status) {
        const body = data.body;
        const cartId = body.data.id;
        window.localStorage.setItem('cartId', cartId);
        commit('SET_CART', productFilter(body));
        commit('SET_REDIRECTURLS', body.data.redirect_urls);
        this.$toast.success(data.message);
      } else {
        this.$toast.error(data.message);
      }
      commit('SET_LOADING', false);
    });
  },

  addCartItem({ commit }, addData) {
    const cartData = { line_items: [{ ...addData }] };
    commit('SET_LOADING', true);
    const cartId = getCartId();
    axios
      .post(`/addCartItem?cartId=${cartId}`, { cartData })
      .then(({ data }) => {
        if (data.status) {
          const body = data.body;
          commit('SET_CART', productFilter(body));
          commit('SET_REDIRECTURLS', body.data.redirect_urls);
          this.$toast.success(data.message);
        } else {
          this.$toast.error(data.message);
        }
        commit('SET_LOADING', false);
      });
  },

  updateCartItem({ commit }, { updateData, item_id }) {
    const cartData = { line_item: { ...updateData } };
    commit('SET_LOADING', true);
    const cartId = getCartId();
    axios
      .put(`/updateCartItem?cartId=${cartId}&itemId=${item_id}`, { cartData })
      .then(({ data }) => {
        if (data.status) {
          const body = data.body;
          commit('SET_CART', productFilter(body));
          commit('SET_REDIRECTURLS', body.data.redirect_urls);
          this.$toast.success(data.message);
        } else {
          this.$toast.error(data.message);
        }
        commit('SET_LOADING', false);
      });
  },

  deleteCartItem({ commit }, itemId) {
    commit('SET_LOADING', true);
    const cartId = getCartId();
    axios
      .delete(`/deleteCartItem?cartId=${cartId}&itemId=${itemId}`)
      .then(({ data }) => {
        if (data.status) {
          const body = data.body;
          const cart = productFilter(body);
          commit('SET_CART', cart);
          commit('SET_REDIRECTURLS', body ? body.data.redirect_urls : null);
          if (cart.length === 0) window.localStorage.removeItem('cartId');
          this.$toast.success(data.message);
        } else {
          this.$toast.error(data.message);
        }
        commit('SET_LOADING', false);
      });
  },

  getCart({ commit }) {
    const cartId = getCartId();
    if (cartId) {
      commit('SET_LOADING', true);
      axios.get(`/getCart?cartId=${cartId}`).then(({ data }) => {
        if (data.status) {
          const body = data.body;
          commit('SET_CART', productFilter(body));
          commit('SET_REDIRECTURLS', body.data.redirect_urls);
        } else {
          window.localStorage.removeItem('cartId');
          commit('SET_CART', productFilter(null));
        }
        commit('SET_LOADING', false);
      });
    }
  },

  updateCartWithCustomerId({ commit }, securedData) {
    const { id } = getSecuredData(securedData);
    const cartId = getCartId();
    if (cartId) {
      commit('SET_LOADING', true);
      axios
        .put(`/updateCartWithCustomerId?cartId=${cartId}&customerId=${id}`)
        .then(({ data }) => {
          if (data.status) {
            this.$toast.success(data.message);
          } else {
            this.$toast.error(data.message);
          }
          commit('SET_LOADING', false);
        });
    }
  },

  async cartCheckout({ state }) {
    const checkoutType = process.env.CHECKOUT_TYPE;
    if (checkoutType === CHECKOUT_TYPE.REDIRECTED) {
      const user = getUser();
      if (user) {
        window.location = getCartCheckoutRedirectUrl(
          state.redirectUrls.checkout_url
        );
      } else window.location = state.redirectUrls.checkout_url;
    } else if (checkoutType === CHECKOUT_TYPE.EMBEDED) {
      this.$router.push('/');
    } else if (checkoutType === CHECKOUT_TYPE.CUSTOM) {
      window.location = '/checkout';
    }
  }
};
