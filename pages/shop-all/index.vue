<template>
  <div v-if="category.products" id="category">
    <div class="navbar section">
      <div class="navbar__aside desktop-only">
        <h1 class="navbar__title">Shop All</h1>
      </div>
      <div class="navbar__main">
        <div class="navbar__counter">
          <span class="navbar__label desktop-only">Products found: </span>
          <strong class="desktop-only">
            {{ category.products.edges.length }}
          </strong>
          <span class="navbar__label mobile-only">
            {{ category.products.edges.length }}
          </span>
        </div>
      </div>
    </div>
    <div class="main section">
      <div class="products">
        <div class="products__list">
          <SfProductCard
            v-for="(product, i) in category.products.edges"
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
  </div>
</template>
<script>
import { SfProductCard, SfButton } from '@storefront-ui/vue';
export default {
  components: {
    SfProductCard,
    SfButton
  },
  layout: 'Default',
  async asyncData({ $queries, $axios }) {
    const result = await $axios.$post('/graphql', {
      query: $queries.shopAll()
    });
    const productsData = result?.data?.site?.route?.node ?? {};
    return { category: productsData };
  },
  data() {
    return {
      category: {}
    };
  }
};
</script>
<style src="~/assets/sass/pages/products.scss" lang="scss" scoped></style>
