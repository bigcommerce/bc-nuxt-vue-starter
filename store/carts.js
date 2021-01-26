import { getCartCheckoutRedirectUrl } from '~/helpers/auth';
const productFilter = (cart) => {
  return cart
    ? cart.data.line_items.physical_items.map((item) => ({
        itemId: item.id,
        id: item.product_id,
        variant_id: item.variant_id,
        title: item.name,
        image: item.image_url,
        price: { regular: item.sale_price },
        configuration: [
          /* { name: 'Size', value: 'XS' },
    { name: 'Color', value: 'White' } */
          // Example configuration
        ],
        qty: item.quantity
      }))
    : [];
};

export const state = () => ({
  products: [],
  isLoading: false
});

export const getters = {
  products(state) {
    return state.products;
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
    this.$axios
      .$post(`/api/stores/${process.env.storeHash}/v3/carts`, {
        line_items: [
          { quantity: createData.quantity, product_id: createData.product_id }
        ]
      })
      .then((response) => {
        const cartId = response.data.id;
        window.localStorage.setItem('cartId', cartId);
        commit('SET_CART', productFilter(response));
        this.$toast.info('Successfully created cart!');
        commit('SET_LOADING', false);
      })
      .catch(() => {
        commit('SET_LOADING', false);
        this.$toast.error('Can not create cart');
      });
  },
  addCartItem({ commit }, addData) {
    const cartId = window.localStorage.getItem('cartId');
    const data = {
      line_items: [
        { quantity: addData.quantity, product_id: addData.product_id }
      ]
    };
    commit('SET_LOADING', true);
    this.$axios
      .$post(
        `/api/stores/${process.env.storeHash}/v3/carts/${cartId}/items`,
        data
      )
      .then((response) => {
        commit('SET_LOADING', false);
        commit('SET_CART', productFilter(response));
        this.$toast.info('Successfully added a item to cart!');
      })
      .catch(() => {
        commit('SET_LOADING', false);
        this.$toast.error('Can not add this item to cart');
      });
  },
  updateCartItem({ commit }, updateData) {
    const cartId = window.localStorage.getItem('cartId');
    const data = {
      line_item: {
        quantity: updateData.quantity,
        product_id: updateData.product_id,
        variant_id: updateData.variant_id
      }
    };
    commit('SET_LOADING', true);
    this.$axios
      .$put(
        `/api/stores/${process.env.storeHash}/v3/carts/${cartId}/items/${updateData.item_id}`,
        data
      )
      .then((response) => {
        commit('SET_CART', productFilter(response));
        this.$toast.info('Successfully updated cart item!');
        commit('SET_LOADING', false);
      })
      .catch(() => {
        commit('SET_LOADING', false);
        this.$toast.error('Can not update this item on cart');
      });
  },
  deleteCartItem({ dispatch, commit }, itemId) {
    const cartId = window.localStorage.getItem('cartId');
    commit('SET_LOADING', true);
    this.$axios
      .$delete(
        `/api/stores/${process.env.storeHash}/v3/carts/${cartId}/items/${itemId}`
      )
      .then((response) => {
        const cart = productFilter(response);
        this.$toast.info('Successfully deleted a item from cart');
        commit('SET_LOADING', false);
        commit('SET_CART', cart);
        if (cart.length === 0) window.localStorage.removeItem('cartId');
      })
      .catch(() => {
        this.$toast.error('Can not delete the cart');
        commit('SET_LOADING', false);
      });
    dispatch('getCart');
  },
  getCart({ commit }) {
    const cartId = window.localStorage.getItem('cartId');
    if (cartId)
      this.$axios
        .$get(`/api/stores/${process.env.storeHash}/v3/carts/${cartId}`)
        .then((cart) => {
          commit('SET_CART', productFilter(cart));
        })
        .catch(() => {
          window.localStorage.removeItem('cartId');
          commit('SET_CART', productFilter(null));
        });
  },
  cartCheckout() {
    const cartId = window.localStorage.getItem('cartId');
    this.$axios
      .$post(
        `/api/stores/${process.env.storeHash}/v3/carts/${cartId}/redirect_urls`
      )
      .then((response) => {
        const redirectUrl = getCartCheckoutRedirectUrl(response);
        window.location.href = redirectUrl;
      })
      .catch(() => {
        this.$toast.error('You can not checkout this cart');
      });
  }
};
