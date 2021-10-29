<template>
  <div>
    <SfHeading
      title="Billing address"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <SfCheckbox
        v-model="sameAsShipping"
        :value="sameAsShipping"
        label="Copy address data from shipping"
        name="copyShippingAddress"
        class="form__element form__checkbox"
        @change="setBillingAsShipping"
      />
      <SfInput
        v-model="$v.billingInfo.first_name.$model"
        :value="billingInfo.first_name"
        label="First name"
        name="first_name"
        class="form__element form__element--half"
        :valid="checkFormValidation($v.billingInfo.first_name)"
        :error-message="'First name is required'"
      />
      <SfInput
        v-model="$v.billingInfo.last_name.$model"
        :value="billingInfo.last_name"
        label="Last name"
        name="last_name"
        class="form__element form__element--half form__element--half-even"
        :valid="checkFormValidation($v.billingInfo.last_name)"
        :error-message="'Last name is required'"
      />
      <SfInput
        v-model="$v.billingInfo.address1.$model"
        :value="billingInfo.address1"
        label="Address 1"
        name="address1"
        class="form__element form__element--half"
        :valid="checkFormValidation($v.billingInfo.address1)"
        :error-message="'Address 1 is required'"
      />
      <SfInput
        v-model="$v.billingInfo.address2.$model"
        :value="billingInfo.address2"
        label="Address 2"
        name="address2"
        class="form__element form__element--half form__element--half-even"
        :valid="checkFormValidation($v.billingInfo.address2)"
        :error-message="'Address 2 is required'"
      />
      <SfInput
        v-model="$v.billingInfo.city.$model"
        :value="billingInfo.city"
        label="City"
        name="city"
        class="form__element form__element--half"
        :valid="checkFormValidation($v.billingInfo.city)"
        :error-message="'City is required'"
      />
      <SfInput
        v-model="$v.billingInfo.postal_code.$model"
        :value="billingInfo.postal_code"
        label="Postal-code"
        name="postal_code"
        class="form__element form__element--half form__element--half-even"
        :valid="checkFormValidation($v.billingInfo.postal_code)"
        :error-message="'Postal code is required'"
      />
      <SfInput
        v-model="$v.billingInfo.country_code.$model"
        :value="billingInfo.country_code"
        label="Country code"
        name="country_code"
        class="form__element"
        :valid="checkFormValidation($v.billingInfo.country_code)"
        :error-message="'Country code is required'"
      />
      <country-select
        v-model="$v.billingInfo.country.$model"
        :country-name="true"
        :country="billingInfo.country"
        top-country="US"
        class="country_select"
      />
      <span
        v-if="!checkFormValidation($v.billingInfo.country)"
        style="margin-top: -20px; color: red; font-size: 14px"
        >Country is required</span
      >
      <region-select
        v-model="$v.billingInfo.state_or_province.$model"
        :country="billingInfo.country"
        :region="billingInfo.state_or_province"
        :country-name="true"
        :region-name="true"
        class="region_select"
      />
      <span
        v-if="!checkFormValidation($v.billingInfo.state_or_province)"
        style="margin-top: -20px; color: red; font-size: 14px"
        >State is required</span
      >
      <SfInput
        v-model="$v.billingInfo.phone.$model"
        :value="billingInfo.phone"
        label="Phone number"
        name="phone"
        class="form__element"
        :valid="checkFormValidation($v.billingInfo.phone)"
        :error-message="'Phone is required'"
      />
    </div>
    <SfHeading
      title="Shipping method"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div class="form__radio-group">
        <SfRadio
          v-for="item in shippingOptions"
          :key="item.id"
          v-model="shippingOptionId"
          :label="item.type"
          :value="item.id"
          name="shippingMethods"
          :description="item.description"
          class="form__radio shipping"
        >
          <template #label="{ label }">
            <div class="sf-radio__label shipping__label">
              <div>
                {{ label }}
              </div>
              <div class="shipping__label-price">{{ item.price }}</div>
            </div>
          </template>
          <template #description="{ description }">
            <div class="sf-radio__description shipping__description">
              <div class="shipping__delivery">
                <span>{{ item.delivery }}</span>
              </div>
              <transition name="sf-fade">
                <div class="shipping__info">
                  {{ description }}
                </div>
              </transition>
            </div>
          </template>
        </SfRadio>
      </div>
    </div>
  </div>
</template>
<script>
import { SfHeading, SfInput, SfCheckbox, SfRadio } from '@storefront-ui/vue';
import { mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import { checkFormValidation } from '~/utils/validation';
export default {
  name: 'Payment',
  components: {
    SfHeading,
    SfInput,
    SfCheckbox,
    SfRadio
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      sameAsShipping: false,
      billingInfo: {
        first_name: '',
        last_name: '',
        address1: '',
        address2: '',
        city: '',
        state_or_province: '',
        country: '',
        country_code: '',
        postal_code: '',
        phone: ''
      },
      shippingOptionId: null
    };
  },
  validations: {
    billingInfo: {
      first_name: {
        required
      },
      last_name: {
        required
      },
      address1: {
        required
      },
      address2: {
        required
      },
      city: {
        required
      },
      state_or_province: {
        required
      },
      country: {
        required
      },
      country_code: {
        required
      },
      postal_code: {
        required
      },
      phone: {
        required
      }
    }
  },
  computed: {
    ...mapGetters('checkout', [
      'shippingAddress',
      'billingAddress',
      'old_billing_address',
      'old_consignments',
      'line_items',
      'shippingMethod'
    ]),
    shippingOptions() {
      if (this.old_consignments.length) {
        const consignment = this.old_consignments[0];
        return consignment.available_shipping_options;
      }
      return [];
    },
    isCreditCard() {
      return ['debit', 'mastercard', 'electron'].includes(this.paymentMethod);
    }
  },
  watch: {
    shippingMethod(val) {
      this.shippingOptionId = val?.id;
    }
  },
  mounted() {
    if (this.billingAddress) {
      this.billingInfo = { ...this.billingAddress };
    } else if (this.old_billing_address !== {}) {
      this.billingInfo = { ...this.old_billing_address };
    }
    if (this.shippingMethod) this.shippingOptionId = this.shippingMethod.id;
  },
  destroyed() {
    this.$store.commit('checkout/SET_BILLING_ADDRESS', this.billingInfo);
  },
  methods: {
    checkFormValidation,
    setBillingAsShipping() {
      const bAddress = { ...this.shippingAddress };
      if (this.sameAsShipping) this.billingInfo = bAddress;
      else
        Object.keys(this.billingInfo).map(
          (key) => (this.billingInfo[key] = '')
        );
    },
    runAction() {
      if (!this.$v.$invalid) {
        this.$store.dispatch('checkout/setBillingAddress', {
          billingAddress: this.billingInfo,
          shippingOptionId: this.shippingOptionId
        });
      }
      return !this.$v.$invalid;
    }
  }
};
</script>
<style
  src="~/assets/sass/components/checkout/payment.scss"
  lang="scss"
  scoped
></style>
