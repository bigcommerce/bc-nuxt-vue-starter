<template>
  <div id="cart">
    <SfSidebar
      :visible="isCartSidebarOpen"
      title="My Cart"
      class="sf-sidebar--right sf-sidebar--icon"
      @close="handleSidebarOpen"
    >
      <template #content-top>
        <SfProperty
          class="sf-property--large cart-summary desktop-only"
          name="Total items"
          :value="totalItems"
        />
      </template>
      <transition name="sf-fade" mode="out-in">
        <div v-if="totalItems" key="my-cart" class="my-cart">
          <div class="collected-product-list">
            <transition-group name="sf-fade" tag="div">
              <SfCollectedProduct
                v-for="product in products"
                :key="product.id"
                :qty="product.qty"
                :image="product.image"
                :title="product.title"
                :regular-price="'$' + product.price.regular"
                :special-price="product.price.special"
                class="collected-product"
                @click:remove="removeHandler(product)"
                @input="(e) => handleQtyEvent(e, product)"
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
                  <div class="desktop-only collected-product__actions">
                    <SfButton class="sf-button--text collected-product__save">
                      Save for later
                    </SfButton>
                    <SfButton
                      class="sf-button--text collected-product__compare"
                    >
                      Add to compare
                    </SfButton>
                  </div>
                </template>
              </SfCollectedProduct>
            </transition-group>
          </div>
        </div>
        <div v-else key="empty-cart" class="empty-cart">
          <div class="empty-cart__banner">
            <SfImage
              alt="Empty bag"
              class="empty-cart__image"
              :src="require('@storefront-ui/shared/icons/empty_cart.svg')"
            />
            <SfHeading
              title="Your cart is empty"
              :level="2"
              class="empty-cart__heading"
              description="Looks like you haven’t added any items to the bag yet. Start
              shopping to fill it in."
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <transition name="sf-fade">
          <div v-if="totalItems">
            <SfProperty
              name="Total price"
              class="sf-property--full-width sf-property--large my-cart__total-price"
            >
              <template #value>
                <SfPrice :regular="'$' + totalPrice" />
              </template>
            </SfProperty>
            <SfButton
              class="sf-button--full-width color-secondary"
              @click="cartCheckout"
              >Go to checkout</SfButton
            >
          </div>
          <div v-else>
            <SfButton class="sf-button--full-width color-primary"
              >Go back shopping</SfButton
            >
          </div>
        </transition>
      </template>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfButton,
  SfHeading,
  SfProperty,
  SfPrice,
  SfImage,
  SfCollectedProduct
} from '@storefront-ui/vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Cart',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfImage,
    SfProperty,
    SfPrice,
    SfCollectedProduct
  },
  props: {
    isCartSidebarOpen: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
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
          const price = product.price.regular;
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
      deleteCartItem: 'carts/deleteCartItem',
      updateCartItem: 'carts/updateCartItem',
      cartCheckout: 'carts/cartCheckout'
    }),
    handleSidebarOpen() {
      this.$parent.handleSidebarOpen();
    },
    removeHandler(product) {
      this.deleteCartItem(product.itemId);
    },
    handleQtyEvent(e, product) {
      if (!isNaN(e)) {
        if (!e) {
          this.deleteCartItem(product.itemId);
        } else {
          this.updateCartItem({
            updateData: {
              quantity: e,
              product_id: product.id,
              variant_id: product.variant_id
            },
            item_id: product.itemId
          });
        }
      }
    }
  }
};
</script>
<style
  src="~/assets/sass/components/cartsidebar.scss"
  lang="scss"
  scoped
></style>
