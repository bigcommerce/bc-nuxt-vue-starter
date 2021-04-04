<!-- eslint-disable vue/no-v-html -->
<template>
  <div id="category">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="navbar section">
      <div class="navbar__aside desktop-only">
        <SfHeading :level="3" title="Categories" class="navbar__title" />
      </div>
      <div class="navbar__main">
        <div class="navbar__counter">
          <span class="navbar__label desktop-only">Products found: </span>
          <span class="desktop-only">{{ products.length }}</span>
          <span class="navbar__label smartphone-only"
            >{{ products.length }} Items</span
          >
        </div>
        <div class="navbar__view">
          <span class="navbar__view-label desktop-only">View</span>
          <SfIcon
            class="navbar__view-icon"
            :color="'#43464E'"
            icon="tiles"
            size="12px"
            role="button"
            aria-label="Change to grid view"
            :aria-pressed="isGridView"
            @click="isGridView = true"
          />
          <SfIcon
            class="navbar__view-icon"
            :color="'#43464E'"
            icon="list"
            size="12px"
            role="button"
            aria-label="Change to list view"
            :aria-pressed="!isGridView"
            @click="isGridView = false"
          />
        </div>
      </div>
    </div>
    <div class="main section">
      <div v-if="sidebarAccordion.length > 0" class="sidebar desktop-only">
        <SfAccordion :open="sidebarAccordion[0].header" :show-chevron="true">
          <SfAccordionItem
            v-for="(accordion, i) in sidebarAccordion"
            :key="i"
            :header="accordion.header"
          >
            <SfList class="list">
              <SfListItem
                v-for="(item, j) in accordion.items"
                :key="j"
                class="list__item"
              >
                <SfMenuItem
                  :label="item.label"
                  :count="item.count"
                  @click="handleSidebar(item.link)"
                />
              </SfListItem>
            </SfList>
          </SfAccordionItem>
        </SfAccordion>
      </div>
      <div class="products">
        <transition-group
          v-if="isGridView"
          appear
          name="products__slide"
          tag="div"
          class="products__grid"
        >
          <SfProductCard
            v-for="(product, i) in products"
            :key="product.id"
            :style="{ '--index': i }"
            :title="product.title"
            :image="product.image"
            :regular-price="product.price.regular"
            :special-price="product.price.special"
            :max-rating="product.rating.max"
            :score-rating="product.rating.score"
            :show-add-to-cart-button="true"
            class="products__product-card"
            @click="gotoProduct(product)"
          >
            <template #add-to-cart>
              <div style="display: flex; justify-content: center">
                <SfButton
                  :link="'/products' + product.path"
                  class="products__choose-options"
                  >Choose Options</SfButton
                >
              </div>
            </template>
          </SfProductCard>
        </transition-group>
        <transition-group
          v-else
          appear
          name="products__slide"
          tag="div"
          class="products__list"
        >
          <SfProductCardHorizontal
            v-for="(product, i) in products"
            :key="product.id"
            :style="{ '--index': i }"
            :title="product.title"
            :image="product.image"
            :regular-price="product.price.regular"
            :special-price="product.price.special"
            :max-rating="product.rating.max"
            :reviews-count="product.reviewsCount"
            :score-rating="product.rating.score"
            :link="'/products' + product.path"
            class="products__product-card-horizontal"
          >
            <template #description>
              <p
                class="sf-product-card-horizontal__description desktop-only"
                v-html="product.description"
              />
            </template>
            <template #add-to-cart
              ><SfButton
                :link="'/products' + product.path"
                class="products__choose-options"
                >Choose Options</SfButton
              ></template
            >
          </SfProductCardHorizontal>
        </transition-group>
        <SfPagination
          class="products__pagination"
          :current="currentPage"
          :total="1"
          :visible="0"
        >
          <template #prev>
            <SfButton class="sf-arrow--transparent" @click="handlePage('prev')">
              <SfIcon icon="arrow_left" size="1.125rem" />
            </SfButton>
          </template>
          <template #next>
            <SfButton class="sf-arrow--transparent" @click="handlePage('next')">
              <SfIcon icon="arrow_right" size="1.125rem" />
            </SfButton>
          </template>
        </SfPagination>
        <div class="products__show-on-page desktop-only">
          <span class="products__show-on-page__label">Show on page:</span>
          <SfSelect class="products__items-per-page" @input="handleShowPage">
            <SfSelectOption
              v-for="option in showOnPage"
              :key="option"
              :value="option"
              class="products__items-per-page__option"
            >
              {{ option }}
            </SfSelectOption>
          </SfSelect>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfButton,
  SfList,
  SfIcon,
  SfMenuItem,
  SfProductCard,
  SfProductCardHorizontal,
  SfPagination,
  SfAccordion,
  SfBreadcrumbs,
  SfSelect
} from '@storefront-ui/vue';
import { mapActions, mapGetters } from 'vuex';
import { productsBreadcrumbs } from '~/constants';
export default {
  components: {
    SfHeading,
    SfButton,
    SfIcon,
    SfList,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfBreadcrumbs,
    SfSelect
  },
  data() {
    return {
      productQtys: [],
      currentPage: 1,
      sortBy: 'Latest',
      isFilterSidebarOpen: false,
      isGridView: true,
      category: 'Shop All',
      displayOnPage: '40',
      sidebarAccordion: [],
      showOnPage: ['5', '10', '20'],
      breadcrumbs: productsBreadcrumbs
    };
  },
  computed: {
    ...mapGetters('product', ['categories', 'products', 'isLoading'])
  },
  watch: {
    currentPage(val) {
      console.log(val);
    },
    categories(val) {
      this.sidebarAccordion = [
        {
          header: 'Products',
          items: val.map((item) => ({
            label: item.name,
            count: item.productCount,
            link: item.path
          }))
        }
      ];
    }
  },
  mounted() {
    this.getProductsByCategory();
    this.getCategories();
  },
  methods: {
    ...mapActions({
      getCategories: 'product/getCategories',
      getProductsByCategory: 'product/getProductsByCategory'
    }),
    updateFilter() {},
    clearAllFilters() {
      const filters = Object.keys(this.filters);
      filters.forEach((name) => {
        const prop = this.filters[name];
        prop.forEach((value) => {
          value.selected = false;
        });
      });
    },
    handleSidebar(path) {
      this.getProductsByCategory({ path });
    },
    gotoProduct(product) {
      this.$router.push('/products' + product.path);
    },
    handleShowPage(e) {
      this.$store.commit('product/SET_SHOW_ON_PAGE', e);
      this.$store.dispatch('product/getProductsByCategory');
    },
    handlePage(action) {
      this.$store.dispatch('product/getProductsByCategory', { page: action });
    }
  }
};
</script>
<style src="~/assets/sass/pages/products.scss" lang="scss" scoped></style>
