<template>
  <div v-if="!product" id="error">
    <div class="img_not_found">
      <SfImage
        class="image"
        :src="require('../../static/assets/not-found.svg')"
        alt=""
      />
    </div>
    <SfHeading
      title="Page not found"
      subtitle="We are sorry that we can’t find the page, please go back or try again"
      class="heading sf-heading--no-underline"
    />
    <div class="actions">
      <SfButton
        class="sf-button--full-width actions__button"
        @click="window.location = '/'"
      >
        Return to home
      </SfButton>
      <SfButton
        class="sf-button--full-width sf-button--text actions__button"
        @click="$emit('click:back')"
      >
        Back
      </SfButton>
    </div>
  </div>
  <div v-else id="product">
    <div>
      <SfBreadcrumbs
        class="breadcrumbs desktop-only"
        :breadcrumbs="breadcrumbs"
      />
      <div class="product">
        <SfGallery :images="product.images" class="product__gallery" />
        <div class="product__info">
          <div class="product__header">
            <SfHeading
              :title="product.name"
              :level="3"
              class="sf-heading--no-underline sf-heading--left"
            />
            <SfIcon
              icon="drag"
              size="42px"
              color="#E0E0E1"
              class="product__drag-icon smartphone-only"
            />
          </div>
          <div class="product__price-and-rating">
            <SfPrice :regular="product.price" />
            <div>
              <div class="product__rating">
                <SfRating
                  :score="product.rating.rate"
                  :max="product.rating.max"
                />
                <a
                  v-if="product.rating.reviews"
                  href="#"
                  class="product__count"
                >
                  ({{ product.rating.reviews }})
                </a>
              </div>
              <SfButton class="sf-button--text">Read all reviews</SfButton>
            </div>
          </div>
          <div>
            <div class="product__description desktop-only">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p v-html="product.description" />
            </div>
            <SfButton class="sf-button--text desktop-only product__guide">
              Size guide
            </SfButton>
            <SfSelect
              v-if="product.sizes.length > 0"
              v-model="selectedSize"
              label="Size"
              class="sf-select--underlined product__select-size"
              :reqired="true"
            >
              <SfSelectOption
                v-for="size in product.sizes"
                :key="size.id"
                :value="size.id"
              >
                <SfProductOption :label="size.value"></SfProductOption>
              </SfSelectOption>
            </SfSelect>
            <div
              v-if="product.colors.length > 0"
              class="product__colors desktop-only"
            >
              <p class="product__color-label">Color:</p>
              <SfColor
                v-for="color in product.colors"
                :key="color.id"
                :color="color.value"
                :selected="color.selected"
                class="product__color"
                @click="selectColor(color.id)"
              />
            </div>
            <SfAddToCart
              v-model="qty"
              class="product__add-to-cart"
              @click="addToCart"
            />
            <SfButton class="sf-button--text desktop-only product__save">
              Save for later
            </SfButton>
            <SfButton class="sf-button--text desktop-only product__compare">
              Add to compare
            </SfButton>
          </div>
          <SfTabs :open-tab="1" class="product__tabs">
            <SfTab v-for="title in tabs" :key="title" :title="title">
              <div v-if="title === 'Description'">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <p v-html="product.description" />
                <SfProperty
                  v-for="(customField, i) in product.customFields.edges"
                  :key="i"
                  :name="customField.node.name"
                  :value="customField.node.value"
                  class="product__property"
                />
              </div>
              <div
                v-else-if="title === 'Additional Information'"
                class="product__additional-info"
              >
                <p class="product__additional-info__title">Brand</p>
                <template v-if="product.brand">
                  <SfHeading
                    :title="product.brand.name"
                    :level="3"
                    class="sf-heading--no-underline sf-heading--left"
                  />
                  <p v-text="product.brand.metaDesc" />
                </template>
              </div>
            </SfTab>
          </SfTabs>
        </div>
      </div>
    </div>
    <div>
      <SfBanner
        title="Download our application to your mobile"
        image="/assets/storybook/Home/bannerD.png"
        class="banner-application sf-banner--left sf-banner--center desktop-only"
      >
        <template #subtitle>
          <div class="banner-application__subtitle">Fashion to Take Away</div>
        </template>
        <template #title>
          <h1 class="banner-application__title">
            Download our application to your&nbsp;mobile
          </h1>
        </template>
        <template #call-to-action>
          <div>
            <img
              class="banner-application__download"
              src="/assets/storybook/Home/google.png"
              alt=""
            />
            <img
              class="banner-application__download"
              src="/assets/storybook/Home/apple.png"
              alt=""
            />
          </div>
        </template>
      </SfBanner>
    </div>
  </div>
</template>
<script>
import {
  SfGallery,
  SfHeading,
  SfPrice,
  SfRating,
  SfIcon,
  SfTabs,
  SfProperty,
  SfButton,
  SfAddToCart,
  SfColor,
  SfSelect,
  SfProductOption,
  SfBreadcrumbs,
  SfImage,
  SfBanner
} from '@storefront-ui/vue';
import { color } from '~/constants';
export default {
  name: 'Product',
  components: {
    SfImage,
    SfGallery,
    SfHeading,
    SfPrice,
    SfRating,
    SfIcon,
    SfTabs,
    SfProperty,
    SfButton,
    SfAddToCart,
    SfColor,
    SfSelect,
    SfProductOption,
    SfBreadcrumbs,
    SfBanner
  },
  async asyncData({ params, $queries, $axios }) {
    const result = await $axios.$post('/graphql', {
      query: $queries.productBySlug(params)
    });
    const product = result.data?.site?.route?.node;

    const filterOption = (option) => {
      return (
        product.options?.edges
          ?.find(({ node }) => node.displayName === option)
          ?.node?.values?.edges?.map(({ node }) => ({
            id: node.entityId,
            value: option === 'Color' ? color[node.label] : node.label,
            selected: false
          })) ?? []
      );
    };

    if (product != null) {
      product.images = product.images.edges.map((t) => {
        return {
          mobile: { url: t.node.mobile },
          desktop: { url: t.node.desktop },
          big: { url: t.node.big },
          alt: ''
        };
      });
      product.price = `$${product.prices?.price?.value.toFixed(2)}`;
      product.colors = filterOption('Color');
      product.sizes = filterOption('Size');
      product.rating = {
        reviews: product.reviewSummary.numberOfReviews,
        rate:
          product.reviewSummary.summationOfRatings /
          product.reviewSummary.numberOfReviews,
        max: 5
      };
    }
    return {
      product
    };
  },
  data() {
    return {
      current: 1,
      selectedColor: null,
      selectedSize: null,
      qty: 1,
      product: {
        name: null,
        description: null,
        images: [],
        price: null,
        colors: [],
        rating: null,
        sizes: [],
        brand: null
      },
      tabs: ['Description', 'Additional Information'],
      breadcrumbs: [
        {
          text: 'Shop All',
          link: '/shop-all'
        },
        {
          text: 'Product Page',
          link: '#'
        }
      ]
    };
  },
  methods: {
    /* eslint-disable array-callback-return */
    addToCart() {
      const variants = this.product.variants.edges;
      const addData = {
        quantity: this.qty,
        product_id: this.product.entityId
      };
      if (variants.length > 0) addData.variant_id = variants[0].node.entityId;
      this.$store.dispatch('carts/addToCart', addData);
    },
    selectColor(colorIndex) {
      this.product.colors.map((el) => {
        if (colorIndex === el.id) {
          el.selected = true;
          this.selectedColor = el.id;
        } else {
          el.selected = false;
        }
      });
    }
  }
};
</script>
<style src="~/assets/sass/pages/product.scss" lang="scss" scoped></style>
