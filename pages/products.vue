<template>
  <div id="category">
    <SfHeader title="BCVueNuxt">
      <template #navigation>
        <SfHeaderNavigationItem>
          <a
            href="/"
            :style="{ display: 'flex', alignItems: 'center', height: '100%' }"
          >
            Home
          </a>
        </SfHeaderNavigationItem>
        <SfHeaderNavigationItem>
          <a
            href="/products"
            :style="{ display: 'flex', alignItems: 'center', height: '100%' }"
          >
            Shop All
          </a>
        </SfHeaderNavigationItem>
      </template>
    </SfHeader>
    <div class="navbar section">
      <div class="navbar__aside desktop-only">
        <h1 class="navbar__title">Shop All</h1>
      </div>
      <div class="navbar__main">
        <div class="navbar__counter">
          <span class="navbar__label desktop-only">Products found: </span>
          <strong class="desktop-only">{{
            category.products.edges.length
          }}</strong>
          <span class="navbar__label mobile-only">{{
            category.products.edges.length
          }}</span>
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
            class="products__product-card"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SfProductCard, SfHeader } from '@storefront-ui/vue';
export default {
  components: {
    SfProductCard,
    SfHeader
  },
  async asyncData({ params, $api, $queries }) {
    const result = await $api.product.list({ query: $queries.shopAll });
    const productsData = result.data.site.route.node;
    return { category: productsData };
  },
  data() {
    return {
      category: {}
    };
  },
  methods: {}
};
</script>
<style src="~/assets/sass/pages/products.scss" lang="scss" scoped></style>
