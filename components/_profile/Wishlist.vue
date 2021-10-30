<template>
  <SfTabs :open-tab="1">
    <SfTab title="My wishlist">
      <div v-if="wishlist.length === 0" class="no-wishlist">
        <p class="no-wishlist__title">
          You currently have no wishlist history.
        </p>
        <SfButton
          link="/products"
          class="no-wishlist__button"
          style="color: white; font-weight: bold"
          >Start shopping</SfButton
        >
      </div>
      <div v-else id="wishlist">
        <SfCollectedProduct
          v-for="(item, index) in wishlist"
          :key="index"
          :image="item.primary_image.url_standard"
          :title="item.name"
          :regular-price="`$${item.price}`"
          class="sf-collected-product--detailed"
          @click:remove="removeWishlistItem(item.wishlistItemId)"
        >
          <template #input><span></span></template>
          <template #configuration>
            <div class="sf-collected-product__properties">
              <SfProperty
                v-for="(property, key) in item.configuration"
                :key="key"
                :name="property.name"
                :value="property.value"
              />
            </div>
          </template>
          <template #actions><span></span></template>
        </SfCollectedProduct>
      </div>
    </SfTab>
  </SfTabs>
</template>
<script>
import {
  SfTabs,
  SfButton,
  SfCollectedProduct,
  SfProperty
} from '@storefront-ui/vue';
import { mapGetters } from 'vuex';
export default {
  name: 'PersonalDetails',
  components: {
    SfTabs,
    SfButton,
    SfCollectedProduct,
    SfProperty
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('product', ['wishlist'])
  },
  mounted() {
    this.$store.dispatch('product/getWishlist');
  },
  methods: {
    removeWishlistItem(wishlistItemId) {
      this.$store.dispatch('product/removeWishlistItem', wishlistItemId);
    }
  }
};
</script>
<style src="~/assets/sass/components/wishlist.scss" lang="scss" scoped></style>
