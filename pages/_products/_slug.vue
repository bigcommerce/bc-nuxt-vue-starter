<template>
  <div>
    <div v-if="!product" id="error">
      <div class="img_not_found">
        <SfImage
          class="image"
          :src="require('../../static/assets/not-found.svg')"
          alt="not_found"
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
                v-if="colors.length > 0"
                class="product__colors desktop-only"
              >
                <p class="product__color-label">Color:</p>
                <SfColor
                  v-for="color in colors"
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
                alt="google"
              />
              <img
                class="banner-application__download"
                src="/assets/storybook/Home/apple.png"
                alt="apple"
              />
            </div>
          </template>
        </SfBanner>
      </div>
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
import { mapGetters, mapActions } from 'vuex';
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
  data() {
    return {
      current: 1,
      selectedSize: null,
      qty: 1,
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
  computed: {
    ...mapGetters('product', [
      'product',
      'isLoading',
      'colors',
      'selectedColor'
    ])
  },
  mounted() {
    this.getProductBySlug(this.$route.params.slug);
  },
  methods: {
    /* eslint-disable array-callback-return */
    ...mapActions({
      getProductBySlug: 'product/getProductBySlug'
    }),
    addToCart() {
      const variants = this.product.variants.edges;
      const addData = {
        quantity: this.qty,
        product_id: this.product.entityId
      };
      if (this.colors.length && this.product.sizes.length) {
        if (!this.selectedSize) {
          this.$toast.error('Please select size');
          return;
        }
        if (!this.selectedColor) {
          this.$toast.error('Please select color');
          return;
        }
        if (this.selectedColor && this.selectedSize) {
          const pairOptions = variants.map(({ node }) => ({
            id: node?.entityId,
            options: node?.options?.edges?.map(
              ({ node }) => node?.values?.edges
            )
          }));
          const selectedVariant = pairOptions.find(
            ({ options }) =>
              options.find((option) =>
                option.find(({ node }) => node?.entityId === this.selectedColor)
              ) &&
              options.find((option) =>
                option.find(
                  ({ node }) => node?.entityId === parseInt(this.selectedSize)
                )
              )
          );
          if (selectedVariant) {
            addData.variant_id = selectedVariant.id;
            this.$store.dispatch('carts/addToCart', addData);
          } else {
            this.$toast.error(
              'We do not have the product which matches to the options'
            );
          }
        }
      } else {
        this.$store.dispatch('carts/addToCart', addData);
      }
    },
    selectColor(colorIndex) {
      this.$store.dispatch('product/setColor', colorIndex);
    }
  }
};
</script>
<style src="~/assets/sass/pages/product.scss" lang="scss" scoped></style>
