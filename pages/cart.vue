<template>
  <div id="detailed-cart">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="detailed-cart">
      <div v-if="totalItems" class="detailed-cart__aside">
        <SfOrderSummary
          order-title="Order review"
          :order-title-level="3"
          :order="getOrder"
          :properties-names="[
            'Products',
            'Subtotal',
            'Shipping',
            'Total price'
          ]"
          :characteristics="characteristics"
        >
          <template #promo>
            <SfInput
              v-model="promoCode"
              name="promoCode"
              placeholder="Enter promo code"
              class="sf-input--filled sf-order-summary__promo-code-input"
            />
            <SfButton
              class="sf-order-summary__promo-code-button"
              data-testid="apply-button"
              @click="addCouponCode"
            >
              Apply
            </SfButton>
          </template>
        </SfOrderSummary>
      </div>
      <div class="detailed-cart__main">
        <transition name="sf-fade" mode="out-in">
          <div
            v-if="totalItems"
            key="detailed-cart"
            class="collected-product-list"
          >
            <transition-group name="sf-fade" tag="div">
              <SfCollectedProduct
                v-for="(product, i) in products"
                :key="'product' + i"
                :qty="product.qty"
                :image="product.image"
                :title="product.title"
                :regular-price="product.price.regular | price"
                :special-price="product.price.special | price"
                class="sf-collected-product--detailed collected-product"
                @click:remove="updateCart(0, product)"
                @input="(e, value) => updateCart(e, product, value)"
              >
                <template #configuration>
                  <div class="collected-product__properties">
                    <SfProperty
                      v-for="(property, key) in product.configuration"
                      :key="key"
                      :name="property.name"
                      :value="property.value"
                    />
                  </div>
                </template>
                <template #actions>
                  <div class="actions desktop-only">
                    <span class="actions__description">
                      Usually arrives in 5-13 business days. A shipping timeline
                      specific to your destination can be viewed in Checkout.
                    </span>
                  </div>
                </template>
              </SfCollectedProduct>
            </transition-group>
          </div>
          <div v-else key="empty-cart" class="empty-cart">
            <SfImage
              :src="require('@storefront-ui/shared/icons/empty_cart.svg')"
              alt="Empty cart"
              class="empty-cart__image"
            />
            <SfHeading
              title="Your cart is empty"
              :level="2"
              description="Looks like you haven’t added any items to the cart yet. Start
                shopping to fill it in."
            />
            <SfButton
              link="/products"
              class="sf-button--full-width color-primary empty-cart__button"
              >Start shopping</SfButton
            >
          </div>
        </transition>
      </div>
    </div>
    <div v-if="totalItems" class="checkout-action">
      <SfButton
        class="sf-button--full-width cart-checkout"
        @click="cartCheckout"
      >
        Go to checkout
      </SfButton>
    </div>
  </div>
</template>
<script>
import {
  SfButton,
  SfProperty,
  SfCollectedProduct,
  SfBreadcrumbs,
  SfImage,
  SfHeading,
  SfOrderSummary,
  SfInput
} from '@storefront-ui/vue';
import { mapGetters, mapActions } from 'vuex';
import { cartBreadcrumbs, characteristics } from '~/constants';
export default {
  name: 'Cart',
  components: {
    SfButton,
    SfProperty,
    SfCollectedProduct,
    SfBreadcrumbs,
    SfImage,
    SfHeading,
    SfOrderSummary,
    SfInput
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
      isCartSidebarOpen: true,
      breadcrumbs: cartBreadcrumbs,
      characteristics,
      promoCode: ''
    };
  },
  computed: {
    ...mapGetters('carts', ['products']),
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
    },
    getOrder() {
      return {
        orderItems: this.products.map((item) => {
          return {
            ...item,
            price: {
              ...item.price,
              regular: `$${item.price.regular ?? 0}`
            }
          };
        })
      };
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
    }),
    addCouponCode() {
      this.$store.dispatch('checkout/addCoupons', this.promoCode);
    }
  }
};
</script>
<style src="~/assets/sass/pages/cart.scss" lang="scss" scoped></style>
