/* eslint-disable camelcase */
import axios from 'axios';
import { CHECKOUT_TYPE } from '~/constants/checkouttype';
import {
  getCartCheckoutRedirectUrl,
  getSecuredData,
  getUser
} from '~/utils/auth';
import sampleLanguageData, { getBrowserLocales } from '~/utils/language';
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
        qty: item.quantity,
        configuration: item.options
      }))
    : [];
};

const setCartLocale = (carts) => {
  const browserLocales = getBrowserLocales();
  const locales = Object.keys(sampleLanguageData).filter((locale) =>
    browserLocales.includes(locale)
  );
  if (locales.length) {
    const selectedLocale = locales[0];
    const selectedLocaleData = sampleLanguageData[selectedLocale];
    carts.map((cart) => {
      const data = selectedLocaleData.find((item) =>
        Object.keys(item).includes(cart.title)
      );
      if (data) {
        cart.title = data[cart.title];
        cart.configuration.map((config) => {
          config.name = data[config.name];
          config.value = data[config.value];
          return config;
        });
      }
      return cart;
    });
  }
  return carts;
};

export const state = () => ({
  products: [],
  redirectUrls: {}
});

export const getters = {
  products(state) {
    return state.products;
  },
  redirectUrls(state) {
    return state.redirectUrls;
  }
};

export const mutations = {
  SET_CART(state, products) {
    state.products = products;
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

  async createCart({ dispatch }, createData) {
    try {
      const cartData = {
        line_items: [{ ...createData }],
        channel_id: `${process.env.CHANNEL_ID}`
      };

      const { data } = await axios.post(`/createCart`, { cartData });

      if (data.status) {
        const body = data.body;
        const cartId = body.data.id;
        window.localStorage.setItem('cartId', cartId);
        dispatch('getCart');
        this.$toast.success(data.message);
      } else {
        this.$toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  },

  async addCartItem({ dispatch }, addData) {
    try {
      const cartData = { line_items: [{ ...addData }] };
      const cartId = getCartId();

      const { data } = await axios.post(`/addCartItem?cartId=${cartId}`, {
        cartData
      });

      if (data.status) {
        dispatch('getCart');
        this.$toast.success(data.message);
      } else {
        this.$toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  },

  async updateCartItem({ dispatch }, { updateData, item_id }) {
    try {
      const cartData = { line_item: { ...updateData } };
      const cartId = getCartId();

      const {
        data
      } = await axios.put(
        `/updateCartItem?cartId=${cartId}&itemId=${item_id}`,
        { cartData }
      );

      if (data.status) {
        dispatch('getCart');
        this.$toast.success(data.message);
      } else {
        this.$toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  },

  async deleteCartItem({ dispatch }, itemId) {
    try {
      const cartId = getCartId();

      const { data } = await axios.delete(
        `/deleteCartItem?cartId=${cartId}&itemId=${itemId}`
      );

      if (data.status) {
        const body = data.body;
        const cart = productFilter(body);
        dispatch('getCart');
        if (cart.length === 0) window.localStorage.removeItem('cartId');
        this.$toast.success(data.message);
      } else {
        this.$toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  },

  async getCart({ commit }) {
    try {
      const cartId = getCartId();
      if (cartId) {
        const { data } = await axios.get(`/getCart?cartId=${cartId}`);

        if (data.status) {
          const body = data.body;
          const carts = productFilter(body);

          commit('SET_CART', setCartLocale(carts));
          commit('SET_REDIRECTURLS', body.data.redirect_urls);
        } else {
          window.localStorage.removeItem('cartId');
          commit('SET_CART', productFilter(null));
        }
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  },

  async updateCartWithCustomerId({ commit }, securedData) {
    try {
      const { id } = getSecuredData(securedData);
      const cartId = getCartId();

      if (cartId) {
        const { data } = await axios.put(
          `/updateCartWithCustomerId?cartId=${cartId}&customerId=${id}`
        );
        if (data.status) {
          this.$toast.success(data.message);
        } else {
          this.$toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  },

  async cartCheckout({ state }) {
    try {
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
        this.$router.push('/checkout');
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  }
};
