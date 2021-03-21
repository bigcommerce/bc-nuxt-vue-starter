<template>
  <div id="cart">
    <transition name="fade" mode="out-in">
      <div v-if="totalItems" key="my-cart" class="my-cart">
        <h3 class="my-cart__total-items">items: {{ totalItems }}</h3>
        <div class="collected-product-list">
          <transition-group name="fade" tag="div">
            <SfCollectedProduct
              v-for="(product, i) in products"
              :key="'product' + i"
              :qty="product.qty"
              :image="product.image"
              :title="product.title"
              :regular-price="product.price.regular | price"
              :special-price="product.price.special | price"
              @click:remove="updateCart(0, product)"
              @input="(e, value) => updateCart(e, product, value)"
            >
              <template #configuration>
                <div class="collected-product__properties">
                  <SfProperty
                    v-for="(property, key) in product.configuration"
                    :key="'property' + key"
                    :name="property.name"
                    :value="property.value"
                  />
                </div>
              </template>
              <template #actions>
                <div class="collected-product__actions">
                  <SfButton class="sf-button--text product__action">
                    Save for later
                  </SfButton>
                  <SfButton class="sf-button--text product__action">
                    Add to compare
                  </SfButton>
                </div>
              </template>
            </SfCollectedProduct>
          </transition-group>
        </div>
        <SfProperty class="sf-property--full-width my-cart__total-price">
          <template #name>
            <span class="sf-property__name">TOTAL</span>
          </template>
          <template #value>
            <SfPrice :regular="totalPrice | price" class="sf-price--big" />
          </template>
        </SfProperty>
        <SfButton class="sf-button--full-width" @click="cartCheckout">
          Go to checkout
        </SfButton>
      </div>
      <div v-else key="empty-cart" class="empty-cart">
        <div class="empty-cart__banner">
          <img
            src="@storefront-ui/shared/icons/empty_cart.svg"
            alt="empty_cart"
            class="empty-cart__icon"
          />
          <h3 class="empty-cart__label">Your bag is empty</h3>
          <p class="empty-cart__description">
            Looks like you haven’t added any items to the bag yet. Start
            shopping to fill it in.
          </p>
        </div>
        <SfButton
          style="width: 100%"
          link="/shop-all"
          class="sf-button--full-width color-secondary"
        >
          Start shopping
        </SfButton>
      </div>
    </transition>
  </div>
</template>
<script>
import {
  SfButton,
  SfProperty,
  SfPrice,
  SfCollectedProduct
} from '@storefront-ui/vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Cart',
  components: {
    SfButton,
    SfProperty,
    SfPrice,
    SfCollectedProduct
  },
  filters: {
    price: (price) => {
      if (!price) {
        return;
      }
      return `$${price}`;
    }
  },
  layout: 'Default',
  data() {
    return {
      isCartSidebarOpen: true
    };
  },
  computed: {
    ...mapGetters('carts', ['products', 'isLoading']),
    totalItems() {
      return this.products.reduce(
        (totalItems, product) => totalItems + parseInt(product.qty, 10),
        0
      );
    },
    totalPrice() {
      return this.products
        .reduce((totalPrice, product) => {
          const price = product.price.special
            ? product.price.special
            : product.price.regular;
          const summary = parseFloat(price).toFixed(2) * product.qty;
          return totalPrice + summary;
        }, 0)
        .toFixed(2);
    }
  },
  mounted() {
    this.getCart();
  },
  methods: {
    ...mapActions({
      getCart: 'carts/getCart',
      updateCartItem: 'carts/updateCartItem',
      deleteCartItem: 'carts/deleteCartItem',
      cartCheckout: 'carts/cartCheckout',
      updateCart(_e, value, product) {
        value
          ? this.updateCartItem({
              updateData: {
                quantity: value,
                product_id: product.id,
                variant_id: product.variant_id
              },
              item_id: product.itemId
            })
          : this.deleteCartItem(product.itemId);
      }
    })
  }
};
</script>
<style src="~/assets/sass/pages/cart.scss" lang="scss" scoped></style>
