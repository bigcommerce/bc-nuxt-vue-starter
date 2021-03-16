<template>
  <div v-if="isLoading">
    <Loader :loading="isLoading" />
  </div>
  <div v-else id="category">
    <template v-if="products.length">
      <div class="navbar section">
        <div class="navbar__aside desktop-only">
          <h1 class="navbar__title">Shop All</h1>
        </div>
        <div class="navbar__main">
          <div class="navbar__counter">
            <span class="navbar__label desktop-only">Products found: </span>
            <strong class="desktop-only">
              {{ products.length }}
            </strong>
            <span class="navbar__label mobile-only">
              {{ products.length }}
            </span>
          </div>
        </div>
      </div>
      <div class="main section">
        <div class="products">
          <div class="products__list">
            <SfProductCard
              v-for="(product, i) in products"
              :key="i"
              :title="product.node.name"
              :image="product.node.defaultImage.url"
              :link="'/products' + product.node.path"
              :regular-price="'$' + product.node.prices.price.value.toFixed(2)"
              :show-add-to-cart-button="true"
              class="products__product-card"
              @click:add-to-cart="addCart(product)"
            >
              <template #add-to-cart
                ><SfButton
                  :link="'/products' + product.node.path"
                  class="products__choose-options"
                  >Choose Options</SfButton
                ></template
              >
            </SfProductCard>
          </div>
        </div>
      </div>
    </template>
    <div v-else style="width: 100%; display: flex; justify-content: center">
      Product Not Found
    </div>
  </div>
</template>
<script>
import { SfProductCard, SfButton } from '@storefront-ui/vue';
import { mapGetters, mapActions } from 'vuex';
import Loader from '~/components/Loader.vue';
export default {
  components: {
    SfProductCard,
    SfButton,
    Loader
  },
  layout: 'Default',
  computed: {
    ...mapGetters('product', ['products', 'isLoading'])
  },
  mounted() {
    this.getShopAll();
  },
  methods: {
    ...mapActions({
      getShopAll: 'product/getShopAll'
    })
  }
};
</script>
<style src="~/assets/sass/pages/products.scss" lang="scss" scoped></style>
