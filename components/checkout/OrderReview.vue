<template>
  <div>
    <SfHeading
      title="Order review"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="review__header">
      <p class="review__title">Personal details</p>
      <SfButton class="sf-button--text" @click="$emit('click:edit', 0)"
        >Edit
      </SfButton>
    </div>
    <p class="content">
      {{ personalDetails.firstName }} {{ personalDetails.lastName }}<br />
    </p>
    <p class="content">{{ personalDetails.email }}</p>
    <br />
    <div class="review__header">
      <p class="review__title">Shipping details</p>
      <SfButton class="sf-button--text" @click="$emit('click:edit', 1)"
        >Edit
      </SfButton>
    </div>
    <p class="content">
      <span class="content__label">{{
        shippingMethod ? shippingMethod.description : 'No selected'
      }}</span
      ><br />
      {{ shippingAddress.address1 }} {{ shippingAddress.address2 }},
      {{ shippingAddress.postal_code }}<br />
      {{ shippingAddress.city }}, {{ shippingAddress.country }}
    </p>
    <br />
    <div class="review__header">
      <p class="review__title">Billing address</p>
      <SfButton class="sf-button--text" @click="$emit('click:edit', 2)"
        >Edit
      </SfButton>
    </div>
    <p class="content">
      {{ billingAddress.address1 }} {{ billingAddress.address2 }},
      {{ billingAddress.postal_code }}<br />
      {{ billingAddress.city }}, {{ billingAddress.country }}
    </p>
    <p class="content">{{ billingAddress.phone }}</p>
    <div class="promo-code">
      <SfInput
        v-model="promoCode"
        name="promoCode"
        label="Enter promo code"
        class="sf-input--filled promo-code__input"
      />
      <SfButton class="promo-code__button" @click="addCouponCode"
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
  SfCharacteristic,
  SfInput
} from '@storefront-ui/vue';
import { mapGetters } from 'vuex';
export default {
  name: 'OrderReview',
  components: {
    SfHeading,
    SfButton,
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
      promoCode: ''
    };
  },
  computed: {
    ...mapGetters('checkout', [
      'personalDetails',
      'shippingAddress',
      'billingAddress',
      'shippingMethod',
      'paymentMethod'
    ])
  },
  methods: {
    addCouponCode() {
      this.$store.dispatch('checkout/addCoupons', this.promoCode);
    }
  }
};
</script>
<style
  src="~/assets/sass/components/checkout/orderreview.scss"
  lang="scss"
  scoped
></style>
