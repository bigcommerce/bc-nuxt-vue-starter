<template>
  <div>
    <SfHeader
      :style="{ 'margin-bottom': '20px' }"
      title="BCVueNuxt"
      class="sf-header--has-mobile-navigation sf-header--has-mobile-search"
      :cart-icon="false"
      :account-icon="false"
      :wishlist-icon="false"
    >
      <template #navigation>
        <SfHeaderNavigationItem
          v-for="item in menu"
          :key="item.link"
          :label="item.name"
          :link="item.link"
          @click="handleClick"
        />
      </template>
      <template #search>
        <SfSearchBar
          placeholder="Search"
          aria-label="Search"
          class="sf-header__search"
          @input="runSearchQuery"
        ></SfSearchBar>
      </template>
    </SfHeader>
    <SfModal
      v-if="searchedProducts.length > 0"
      :visible="visible"
      :overlay="false"
      :cross="true"
      :persistent="false"
      @close="handleCloseModal"
    >
      <ul class="product_list">
        <li
          v-for="(product, key) in searchedProducts"
          :key="key"
          class="list_item"
          @click="handleProductClick(product.path)"
        >
          <SfImage :width="60" :src="product.image" :alt="product.name" />
          <span>{{ product.name }}</span>
        </li>
      </ul>
    </SfModal>
  </div>
</template>

<script>
import { SfHeader, SfSearchBar, SfImage, SfModal } from '@storefront-ui/vue';
import { mapGetters, mapActions } from 'vuex';
import { menu } from '~/constants';
export default {
  name: 'Home',
  components: {
    SfHeader,
    SfSearchBar,
    SfImage,
    SfModal
  },
  props: {
    menu: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      visible: true
    };
  },
  computed: {
    ...mapGetters('product', ['searchedProducts'])
  },
  methods: {
    ...mapActions({
      searchProductByKey: 'product/searchProductByKey'
    }),
    handleClick(e) {
      const menuItem = e.target.getAttribute('data-testid');
      if (menuItem) {
        const route = menu.find((item) => item.name === menuItem).link;
        this.$router.push(route);
      }
    },
    runSearchQuery(key) {
      this.visible = true;
      this.searchProductByKey(key);
    },
    handleCloseModal() {
      this.visible = false;
    },
    handleProductClick(path) {
      this.$router.push('/products' + path);
    }
  }
};
</script>
