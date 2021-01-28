<template>
  <div v-if="category.products" id="category">
    <Loader :loading="isLoading" />
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
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SfProductCard } from '@storefront-ui/vue';
import { mapActions, mapGetters } from 'vuex';
import Loader from '~/components/Loader.vue';
export default {
  components: {
    SfProductCard,
    Loader
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
  },
  computed: {
    ...mapGetters('carts', ['isLoading'])
  },
  methods: {
    ...mapActions({
      addToCart: 'carts/addToCart'
    }),
    addCart(product) {
      const variants = product.node.variants.edges;
      const addData = {
        quantity: 1,
        product_id: product.node.entityId
      };
      if (variants.length > 0) addData.variant_id = variants[0].node.entityId;
      this.addToCart(addData);
    }
  }
};
</script>
<style src="~/assets/sass/pages/products.scss" lang="scss" scoped></style>
