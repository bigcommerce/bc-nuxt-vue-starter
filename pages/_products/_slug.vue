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
              <div v-if="options.length">Variants</div>
              <template v-for="(option, key) in options">
                <div
                  v-if="option.field === 'Color' && option.values.length > 0"
                  :key="key + `${option.field}`"
                  class="product__colors desktop-only"
                >
                  <p class="product__color-label">Color:</p>
                  <SfColor
                    v-for="color in option.values"
                    :key="color.id"
                    :color="color.color"
                    :selected="color.selected"
                    class="product__color"
                    @click="selectColor(color.id)"
                  />
                </div>
                <SfSelect
                  v-else
                  :key="key + `${option.field}`"
                  v-model="selectedField[option.field]"
                  :value="selectedField[option.field]"
                  :label="option.field"
                  class="sf-select--underlined product__select-size"
                  :reqired="true"
                >
                  <SfSelectOption
                    v-for="field in option.values"
                    :key="field.id"
                    :value="field.id"
                  >
                    <SfProductOption :label="field.label"></SfProductOption>
                  </SfSelectOption>
                </SfSelect>
              </template>
              <div v-if="modifiers.length">Modifiers</div>
              <template v-for="(modifier, key) in modifiers">
                <SfInput
                  v-if="!modifier.values.length"
                  :key="key + `${modifier.display_name}`"
                  v-model="selectedField[modifier.display_name]"
                  :value="selectedField[modifier.display_name]"
                  :name="modifier.display_name"
                  :label="modifier.display_name"
                  class="form__element form__element--half"
                />
                <SfSelect
                  v-else
                  :key="key + `${modifier.display_name}`"
                  v-model="selectedField[modifier.display_name]"
                  :value="selectedField[modifier.display_name]"
                  :label="modifier.display_name"
                  class="sf-select--underlined product__select-size"
                  :reqired="true"
                >
                  <SfSelectOption
                    v-for="field in modifier.values"
                    :key="field.id"
                    :value="field.id"
                  >
                    <SfProductOption :label="field.label"></SfProductOption>
                  </SfSelectOption>
                </SfSelect>
              </template>
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
                    <p v-text="product.brand.seo.metaDescription" />
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
  SfBanner,
  SfInput
} from '@storefront-ui/vue';
import { mapGetters, mapActions } from 'vuex';
import _ from 'lodash';
import { productBreadcrumbs } from '~/constants';
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
    SfBanner,
    SfInput
  },
  data() {
    return {
      current: 1,
      selectedField: {},
      qty: 1,
      tabs: ['Description', 'Additional Information'],
      breadcrumbs: productBreadcrumbs,
      options: [],
      modifiers: [],
      variants: [],
      optionFields: [],
      modifierFields: []
    };
  },
  computed: {
    ...mapGetters('product', ['product'])
  },
  watch: {
    product(val) {
      if (val) {
        this.options = _.cloneDeep(val.options);
        this.variants = _.cloneDeep(val.variants);
        this.modifiers = _.cloneDeep(val.modifiers);
        this.optionFields = this.options.map(({ field }) => field);
        this.modifierFields = this.modifiers.map((item) => item.display_name);
        [...this.optionFields, ...this.modifierFields].map((item) =>
          this.$set(this.selectedField, item, null)
        );
      }
    }
  },
  mounted() {
    this.getProductBySlug(this.$route.params.slug);
  },
  methods: {
    ...mapActions({
      getProductBySlug: 'product/getProductBySlug'
    }),
    addToCart() {
      let isCartable = true;
      const addData = {
        quantity: this.qty,
        product_id: this.product.entityId
      };
      if (this.options.length) {
        const missedFields = [];
        this.optionFields.forEach((field) => {
          if (!this.selectedField[field]) {
            missedFields.push(field);
          }
        });
        if (missedFields.length) {
          this.$toast.error(`Please select ${missedFields.toString()}`);
          isCartable = false;
          return;
        }
        const selectedVariant = this.variants.find((variant) => {
          let matched = true;
          variant.values.forEach((item) => {
            if (
              parseInt(this.selectedField[item.option_display_name]) !== item.id
            )
              matched = false;
          });
          if (matched) return true;
          return false;
        });
        if (selectedVariant) addData.variant_id = selectedVariant.id;
      }

      if (this.modifiers.length) {
        addData.option_selections = [];
        const missedFields = [];
        this.modifierFields.forEach((field) => {
          if (!this.selectedField[field]) {
            missedFields.push(field);
          }
        });
        if (missedFields.length) {
          this.$toast.error(`Please select ${missedFields.toString()}`);
          isCartable = false;
          return;
        }
        this.modifiers.forEach((item) => {
          if (this.selectedField[item.display_name]) {
            addData.option_selections.push({
              option_id: item.id,
              option_value: this.selectedField[item.display_name]
            });
          }
        });
      }
      if (isCartable) this.$store.dispatch('carts/addToCart', addData);
    },
    selectColor(colorIndex) {
      this.options.map((option) => {
        if (option.field.toLowerCase() === 'color') {
          option.values.map((item) => {
            item.selected = false;
            return item;
          });
        }
        return option;
      });
      this.options.map((option) => {
        if (option.field.toLowerCase() === 'color') {
          option.values.map((item) => {
            if (item.id === colorIndex) {
              item.selected = true;
              this.$set(this.selectedField, option.field, item.id);
            }
            return item;
          });
        }
        return option;
      });
    }
  }
};
</script>
<style src="~/assets/sass/pages/product.scss" lang="scss" scoped></style>
