<!--
<template>
  <div id="category">
    <template v-if="products.length">
      <div class="navbar section">
        <div class="navbar__aside desktop-only">
          <h1 class="navbar__title">Products</h1>
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
    <template v-else>
      <div class="navbar section">
        <div class="navbar__aside desktop-only">
          <h1 class="navbar__title">Products</h1>
        </div>
        <div class="navbar__main">
          <div class="navbar__counter">
            <span class="navbar__label desktop-only">Products Not found: </span>
            <strong class="desktop-only">
              {{ products.length }}
            </strong>
            <span class="navbar__label mobile-only">
              {{ products.length }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { SfProductCard, SfButton } from '@storefront-ui/vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    SfProductCard,
    SfButton
  },
  layout: 'Default',
  computed: {
    ...mapGetters('product', ['products', 'isLoading'])
  },
  mounted() {
    this.getProductsByCategory();
  },
  methods: {
    ...mapActions({
      getProductsByCategory: 'product/getProductsByCategory'
    })
  }
};
</script>
<style src="~/assets/sass/pages/products.scss" lang="scss" scoped></style>
-->
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
        <SfButton
          class="sf-button--text navbar__filters-button"
          aria-label="Filters"
          @click="isFilterSidebarOpen = true"
        >
          <SfIcon
            size="24px"
            color="#43464E"
            icon="filter2"
            class="navbar__filters-icon"
          />
          Filters
        </SfButton>
        <div class="navbar__sort desktop-only">
          <span class="navbar__label">Sort by:</span>
          <SfComponentSelect v-model="sortBy" class="navbar__select">
            <SfComponentSelectOption
              v-for="option in sortByOptions"
              :key="option.value"
              :value="option.value"
              class="sort-by__option"
              >{{ option.label }}</SfComponentSelectOption
            >
          </SfComponentSelect>
        </div>
        <div class="navbar__counter">
          <span class="navbar__label desktop-only">Products found: </span>
          <span class="desktop-only">280</span>
          <span class="navbar__label smartphone-only">280 Items</span>
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
          :total="4"
          :visible="5"
          @click="
            (page) => {
              currentPage = page;
            }
          "
        />
        <div class="products__show-on-page desktop-only">
          <span class="products__show-on-page__label">Show on page:</span>
          <SfSelect class="products__items-per-page">
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
    <SfSidebar
      :visible="isFilterSidebarOpen"
      title="Filters"
      class="sidebar-filters"
      @close="isFilterSidebarOpen = false"
    >
      <div class="filters desktop-only">
        <SfHeading
          :level="4"
          title="Collection"
          class="filters__title sf-heading--left"
        />
        <SfFilter
          v-for="filter in filters.collection"
          :key="filter.value"
          :label="filter.label"
          :count="filter.count"
          :selected="filter.selected"
          class="filters__item"
          @change="filter.selected = !filter.selected"
        />
        <SfHeading
          :level="4"
          title="Color"
          class="filters__title sf-heading--left"
        />
        <div class="filters__colors">
          <SfColor
            v-for="filter in filters.color"
            :key="filter.value"
            :color="filter.color"
            :selected="filter.selected"
            class="filters__color"
            @click="filter.selected = !filter.selected"
          />
        </div>
        <SfHeading
          :level="4"
          title="Size"
          class="filters__title sf-heading--left"
        />
        <SfFilter
          v-for="filter in filters.size"
          :key="filter.value"
          :label="filter.label"
          :count="filter.count"
          :selected="filter.selected"
          class="filters__item"
          @change="filter.selected = !filter.selected"
        />
        <SfHeading
          :level="4"
          title="Price"
          class="filters__title sf-heading--left"
        />
        <SfFilter
          v-for="filter in filters.price"
          :key="filter.value"
          :label="filter.label"
          :count="filter.count"
          :selected="filter.selected"
          class="filters__item"
          @change="filter.selected = !filter.selected"
        />
        <SfHeading
          :level="4"
          title="Material"
          class="filters__title sf-heading--left"
        />
        <SfFilter
          v-for="filter in filters.material"
          :key="filter.value"
          :value="filter.value"
          :label="filter.label"
          :selected="filter.selected"
          class="filters__item"
          @change="filter.selected = !filter.selected"
        />
      </div>
      <SfAccordion class="filters smartphone-only">
        <SfAccordionItem header="Show on page" class="filters__accordion-item">
          <template #additional-info>
            <span class="filters__chosen"> {{ displayOnPage }} items </span>
          </template>
          <SfRadio
            v-for="value in showOnPage"
            :key="value"
            v-model="displayOnPage"
            :value="value"
            :label="value"
            class="filters__item"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Sort by" class="filters__accordion-item">
          <template #additional-info>
            <span class="filters__chosen">
              {{ sortBy }}
            </span>
          </template>
          <SfRadio
            v-for="sort in sortByOptions"
            :key="sort.value"
            v-model="sortBy"
            :value="sort.value"
            :label="sort.label"
            class="filters__item"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Category" class="filters__accordion-item">
          <template #additional-info>
            <span class="filters__chosen">
              {{ category }}
            </span>
          </template>
          <SfRadio
            v-for="cat in sidebarAccordion"
            :key="cat.header"
            v-model="category"
            :value="cat.header"
            :label="cat.header"
            class="filters__item"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Collection" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.collection"
            :key="filter.value"
            :label="filter.label"
            :count="filter.count"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Color" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.color"
            :key="filter.value"
            :label="filter.label"
            :color="filter.color"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Size" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.size"
            :key="filter.value"
            :label="filter.label"
            :count="filter.count"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Price" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.price"
            :key="filter.value"
            :label="filter.label"
            :count="filter.count"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Material" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.material"
            :key="filter.value"
            :value="filter.value"
            :label="filter.label"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
      </SfAccordion>
      <template #content-bottom>
        <div class="filters__buttons">
          <SfButton
            class="sf-button--full-width"
            @click="isFilterSidebarOpen = false"
            >Done</SfButton
          >
          <SfButton
            class="sf-button--full-width filters__button-clear"
            @click="clearAllFilters"
            >Clear all</SfButton
          >
        </div>
      </template>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfHeading,
  SfSidebar,
  SfButton,
  SfList,
  SfIcon,
  SfMenuItem,
  SfFilter,
  SfProductCard,
  SfProductCardHorizontal,
  SfPagination,
  SfAccordion,
  SfComponentSelect,
  SfBreadcrumbs,
  SfColor,
  SfRadio,
  SfSelect
} from '@storefront-ui/vue';
import { mapActions, mapGetters } from 'vuex';
import { productsBreadcrumbs } from '~/constants';
export default {
  components: {
    SfHeading,
    SfButton,
    SfSidebar,
    SfIcon,
    SfList,
    SfFilter,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfComponentSelect,
    SfBreadcrumbs,
    SfColor,
    SfRadio,
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
      sortByOptions: [
        {
          value: 'Latest',
          label: 'Latest'
        },
        {
          value: 'Price-up',
          label: 'Price from low to high'
        },
        {
          value: 'Price-down',
          label: 'Price from high to low'
        }
      ],
      sidebarAccordion: [],
      showOnPage: ['5', '10', '20'],
      filters: {
        collection: [
          {
            label: 'Summer fly',
            value: 'summer-fly',
            count: '10',
            selected: false
          },
          {
            label: 'Best 2018',
            value: 'best-2018',
            count: '23',
            selected: false
          },
          {
            label: 'Your choice',
            value: 'your-choice',
            count: '54',
            selected: false
          }
        ],
        color: [
          { label: 'Red', value: 'red', color: '#990611', selected: false },
          { label: 'Black', value: 'black', color: '#000000', selected: false },
          {
            label: 'Yellow',
            value: 'yellow',
            color: '#DCA742',
            selected: false
          },
          { label: 'Blue', value: 'blue', color: '#004F97', selected: false },
          { label: 'Navy', value: 'navy', color: '#656466', selected: false }
        ],
        size: [
          { label: 'Size 2 (XXS)', value: 'xxs', count: '10', selected: false },
          { label: 'Size 4-6 (XS)', value: 'xs', count: '23', selected: false },
          { label: 'Size 8-10 (S)', value: 's', count: '54', selected: false },
          {
            label: 'Size 12-14 (M)',
            value: 'm',
            count: '109',
            selected: false
          },
          { label: 'Size 16-18 (L)', value: 'l', count: '23', selected: false },
          {
            label: 'Size 20-22(XL)',
            value: 'xl',
            count: '12',
            selected: false
          },
          {
            label: 'Size 24-26 (XXL)',
            value: 'xxl',
            count: '2',
            selected: false
          }
        ],
        price: [
          {
            label: 'Under $200',
            value: 'under-200',
            count: '23',
            selected: false
          },
          {
            label: 'Under $300',
            value: 'under-300',
            count: '54',
            selected: false
          }
        ],
        material: [
          { label: 'Cotton', value: 'coton', count: '33', selected: false },
          { label: 'Silk', value: 'silk', count: '73', selected: false }
        ]
      },
      breadcrumbs: productsBreadcrumbs
    };
  },
  computed: {
    ...mapGetters('product', ['categories', 'products', 'isLoading'])
  },
  watch: {
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
    this.getProductsByCategory('/shop-all/');
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
      this.getProductsByCategory(path);
    },
    gotoProduct(product) {
      this.$router.push('/products' + product.path);
    },
    addToCart(product) {
      const qtyItem = this.productQtys.find(
        (item) => item.entityId === product.id
      );
      if (!qtyItem) {
        this.$toast.error('Please input quantity');
      } else {
        console.log(qtyItem);
      }
    },
    handleQty(e, product) {
      const qtyItem = this.productQtys.find(
        (item) => item.entityId === product.id
      );
      if (qtyItem) {
        qtyItem.qty = e;
      } else {
        this.productQtys.push({
          qty: 1,
          entityId: product.id
        });
      }
    }
  }
};
</script>
<style src="~/assets/sass/pages/products.scss" lang="scss" scoped></style>
