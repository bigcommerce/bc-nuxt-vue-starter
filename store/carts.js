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
  products: []
});

export const getters = {
  products(state) {
    return state.products;
  }
};

export const mutations = {
  SET_CART(state, products) {
    state.products = products;
  }
};

export const actions = {
  async addToCart({ dispatch }, data) {
    const cartId = window.localStorage.getItem('cartId');
    if (cartId && cartId !== 'null') dispatch('addCartItem', data);
    else dispatch('createCart', data);
  },
  async createCart({ commit }, createData) {
    const cart = await this.$axios.$post(
      `/api/stores/${process.env.storeHash}/v3/carts`,
      {
        line_items: [
          { quantity: createData.quantity, product_id: createData.product_id }
        ]
      }
    );
    const cartId = cart.data.id;
    window.localStorage.setItem('cartId', cartId);
    commit('SET_CART', productFilter(cart));
    this.$toast.info('Successfully created cart!');
  },
  async addCartItem({ commit }, addData) {
    const cartId = window.localStorage.getItem('cartId');
    const data = {
      line_items: [
        { quantity: addData.quantity, product_id: addData.product_id }
      ]
    };
    const cart = await this.$axios.$post(
      `/api/stores/${process.env.storeHash}/v3/carts/${cartId}/items`,
      data
    );
    commit('SET_CART', productFilter(cart));
    this.$toast.info('Successfully added a item to cart!');
  },
  async updateCartItem({ commit }, updateData) {
    const cartId = window.localStorage.getItem('cartId');
    const data = {
      line_item: {
        quantity: updateData.quantity,
        product_id: updateData.product_id,
        variant_id: updateData.variant_id
      }
    };
    const cart = await this.$axios.$put(
      `/api/stores/${process.env.storeHash}/v3/carts/${cartId}/items/${updateData.item_id}`,
      data
    );
    commit('SET_CART', productFilter(cart));
    this.$toast.info('Successfully updated cart item!');
  },
  async deleteCartItem({ dispatch }, itemId) {
    const cartId = window.localStorage.getItem('cartId');
    await this.$axios.$delete(
      `/api/stores/${process.env.storeHash}/v3/carts/${cartId}/items/${itemId}`
    );
    this.$toast.error('Successfully deleted a item from cart!');
    dispatch('getCart');
  },
  async getCart({ commit }) {
    const cartId = window.localStorage.getItem('cartId');
    if (cartId && cartId !== 'null')
      this.$axios
        .$get(`/api/stores/${process.env.storeHash}/v3/carts/${cartId}`)
        .then((cart) => {
          commit('SET_CART', productFilter(cart));
        })
        .catch(() => {
          window.localStorage.setItem('cartId', null);
          commit('SET_CART', productFilter(null));
        });
  }
};
