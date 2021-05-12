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
    <br />
    <p class="content">{{ order.email }}</p>
    <div class="review__header">
      <p class="review__title">Shipping details</p>
      <SfButton class="sf-button--text" @click="$emit('click:edit', 1)"
        >Edit
      </SfButton>
    </div>
    <p class="content">
      <span class="content__label content__shipping">{{
        shippingMethod.label
      }}</span
      ><br />
      {{ shippingAddress.address1 }} {{ shippingAddress.address2 }},
      {{ shippingAddress.postal_code }}<br />
      {{ shippingAddress.city }}, {{ shippingAddress.country }}
    </p>
    <div class="review__header">
      <p class="review__title">Billing address</p>
      <SfButton class="sf-button--text" @click="$emit('click:edit', 2)"
        >Edit
      </SfButton>
    </div>
    <p class="content">
      <span class="content__label">{{ payment.shippingMethod }}</span
      ><br />
      {{ billingAddress.address1 }} {{ billingAddress.address2 }},
      {{ billingAddress.postal_code }}<br />
      {{ billingAddress.city }}, {{ billingAddress.country }}
    </p>
    <p class="content">{{ billingAddress.phone }}</p>
    <div class="review__header">
      <p class="review__title">Payment method</p>
      <SfButton class="sf-button--text" @click="$emit('click:edit', 2)"
        >Edit
      </SfButton>
    </div>
    <p class="content">{{ paymentMethod.label }}</p>
    <div class="promo-code">
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
    order: {
      type: Object,
      default: () => ({})
    },
    shippingMethods: {
      type: Array,
      default: () => []
    },
    paymentMethods: {
      type: Array,
      default: () => []
    },
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
      'billingAddress'
    ]),
    shipping() {
      return this.order.shipping;
    },
    shippingMethod() {
      const shippingMethod = this.shipping.shippingMethod;
      const method = this.shippingMethods.find(
        (method) => method.value === shippingMethod
      );
      return method || { price: 0 };
    },
    payment() {
      return this.order.payment;
    },
    paymentMethod() {
      const paymentMethod = this.payment.paymentMethod;
      const method = this.paymentMethods.find(
        (method) => method.value === paymentMethod
      );
      return method || { label: '' };
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
.title {
  --heading-title-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-font-weight: var(--font-weight--bold);
  border-bottom: 1px solid var(--c-white);
}
.review {
  box-sizing: border-box;
  width: 100%;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__title {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--medium);
    font-size: var(--font-size--base);
  }
}
.promo-code {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: var(--spacer-lg);
  margin-top: var(--spacer-lg);
  border-top: var(--c-white) solid 1px;
  &__input {
    --input-background: var(--c-white);
    --input-label-font-size: var(--font-size--base);
    flex: 1;
  }
  &__button {
    --button-height: 1.875rem;
  }
}
.promo-code {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: var(--spacer-lg) 0 var(--spacer-base) 0;
  margin-top: var(--spacer-lg);
  border-top: var(--c-white) solid 1px;
  &__input {
    --input-background: var(--c-white);
    flex: 1;
  }
  &__button {
    --button-height: 30px;
  }
}
.characteristics {
  &__item {
    margin: var(--spacer-base) 0;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
.content {
  font-family: var(--font-family--primary);
  font-size: var(--font-size--sm);
  line-height: 1.6;
  font-weight: var(--font-weight--normal);
  margin: 0;
  color: var(--c-dark-variant);
  &__label {
    color: var(--c-text);
  }
  &__shipping {
    font-weight: var(--font-weight--bold);
  }
}
</style>
