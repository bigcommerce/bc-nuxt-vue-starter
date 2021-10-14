/* eslint-disable camelcase */
import { embedCheckout } from '@bigcommerce/checkout-sdk';
import axios from 'axios';
import { API_URL } from '~/config/constants';
import { CHECKOUT_TYPE } from '~/constants';
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

      const { data } = await axios.post(`${API_URL}/createCart`, { cartData });

      const cartId = data?.data?.id;
      window.localStorage.setItem('cartId', cartId);
      dispatch('getCart');
      this.$toast.success('Successfully added!');
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in creating cart');
    }
  },

  async addCartItem({ dispatch }, addData) {
    try {
      const cartData = { line_items: [{ ...addData }] };
      const cartId = getCartId();

      await axios.post(`${API_URL}/addCartItem?cartId=${cartId}`, {
        cartData
      });

      dispatch('getCart');
      this.$toast.success('Successfully added!');
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong adding item to cart');
    }
  },

  async updateCartItem({ dispatch }, { updateData, item_id }) {
    try {
      const cartData = { line_item: { ...updateData } };
      const cartId = getCartId();

      await axios.put(
        `${API_URL}/updateCartItem?cartId=${cartId}&itemId=${item_id}`,
        {
          cartData
        }
      );
      this.$toast.success('Successfully updated!');
      dispatch('getCart');
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in updating cart item');
    }
  },

  async deleteCartItem({ dispatch }, itemId) {
    try {
      const cartId = getCartId();

      const { data } = await axios.delete(
        `${API_URL}/deleteCartItem?cartId=${cartId}&itemId=${itemId}`
      );

      const cart = productFilter(data);
      dispatch('getCart');
      this.$toast.success('Successfully deleted!');
      if (cart.length === 0) window.localStorage.removeItem('cartId');
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in deleting cart item');
    }
  },

  async getCart({ commit }) {
    try {
      const cartId = getCartId();
      if (cartId) {
        const { data } = await axios.get(`${API_URL}/getCart?cartId=${cartId}`);
        const carts = productFilter(data);

        commit('SET_CART', setCartLocale(carts));
        commit('SET_REDIRECTURLS', data.data.redirect_urls);
      }
    } catch (error) {
      console.log(error);
      window.localStorage.removeItem('cartId');
      commit('SET_CART', productFilter(null));
    }
  },

  async updateCartWithCustomerId({ commit }, securedData) {
    try {
      const { id } = getSecuredData(securedData);
      const cartId = getCartId();

      if (cartId) {
        await axios.put(
          `${API_URL}/updateCartWithCustomerId?cartId=${cartId}&customerId=${id}`
        );
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong in updating cart with customer');
    }
  },

  async cartCheckout({ state }) {
    try {
      const user = getUser();
      const checkoutType = process.env.CHECKOUT_TYPE;
      if (checkoutType === CHECKOUT_TYPE.REDIRECTED) {
        if (user) {
          window.location = getCartCheckoutRedirectUrl(
            state.redirectUrls.checkout_url
          );
        } else window.location = state.redirectUrls.checkout_url;
      } else if (checkoutType === CHECKOUT_TYPE.EMBEDDED) {
        let url = '';
        if (user) {
          url = getCartCheckoutRedirectUrl(
            state.redirectUrls.embedded_checkout_url
          );
        } else url = state.redirectUrls.embedded_checkout_url;
        embedCheckout({
          containerId: 'embedded-checkout',
          url
        });
      } else if (checkoutType === CHECKOUT_TYPE.CUSTOM) {
        this.$router.push('/checkout');
      }
    } catch (error) {
      console.log(error);
      this.$toast.error('Something went wrong');
    }
  }
};
