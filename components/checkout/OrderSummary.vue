<template>
  <div id="order-summary">
    <SfHeading
      title="Totals"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="highlighted highlighted--total">
      <SfProperty
        name="Product Items"
        :value="totalItems"
        class="sf-property--full-width sf-property--large property"
      />
      <SfProperty
        name="Subtotal"
        :value="subtotal"
        class="sf-property--full-width sf-property--large property"
      />
      <SfProperty
        name="Shipping"
        :value="shippingMethod ? '$' + shippingMethod.cost : '$0'"
        class="sf-property--full-width sf-property--large property"
      />
      <SfDivider class="divider" />
      <SfProperty
        name="Total price"
        :value="total"
        class="sf-property--full-width sf-property--large property"
      />
    </div>
    <div class="highlighted promo-code">
      <SfInput
        v-model="promoCode"
        name="promoCode"
        label="Enter promo code"
        class="sf-input--filled promo-code__input"
      />
      <SfButton class="promo-code__button" @click="$emit('click:apply')"
        >Apply</SfButton
      >
    </div>

    <div class="characteristics">
      <SfCharacteristic
        v-for="characteristic in characteristics"
        :key="characteristic.title"
        :title="characteristic.title"
        :description="characteristic.description"
        :icon="characteristic.icon"
        size-icon="32px"
        color-icon="green-primary"
        class="characteristics__item"
      />
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfButton,
  SfDivider,
  SfProperty,
  SfCharacteristic,
  SfInput
} from '@storefront-ui/vue';
import { mapGetters } from 'vuex';
export default {
  name: 'OrderSummary',
  components: {
    SfHeading,
    SfButton,
    SfDivider,
    SfProperty,
    SfCharacteristic,
    SfInput
  },
  props: {
    characteristics: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      promoCode: '',
      showPromoCode: false,
      listIsHidden: false
    };
  },
  computed: {
    ...mapGetters('carts', ['products']),
    ...mapGetters('checkout', ['shippingMethod']),
    totalItems() {
      return (
        '' +
        this.products.reduce((previous, current) => {
          return previous + current.qty;
        }, 0)
      );
    },
    paymentMethod() {
      return { label: '' };
    },
    subtotal() {
      const subtotal = this.products.reduce((previous, current) => {
        const qty = current.qty;
        const price = current.price.special
          ? current.price.special
          : current.price.regular;
        const total = qty * parseFloat(price);
        return previous + total;
      }, 0);
      return '$' + subtotal.toFixed(2);
    },
    total() {
      const subtotal = parseFloat(this.subtotal.replace('$', ''));
      const shipping = parseFloat(this.shippingMethod?.cost ?? 0);
      const total = subtotal + shipping;
      return '$' + total.toFixed(2);
    }
  },
  mounted() {
    this.$store.dispatch('carts/getCart');
  }
};
</script>
<style
  src="~/assets/sass/components/checkout/ordersummary.scss"
  lang="scss"
  scoped
></style>
