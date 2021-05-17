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
        v-model="billingInfo.first_name"
        :value="billingInfo.first_name"
        label="First name"
        name="first_name"
        class="form__element form__element--half"
        :valid="$v.billingInfo.first_name.required"
        :error-message="'First name is required'"
      />
      <SfInput
        v-model="billingInfo.last_name"
        :value="billingInfo.last_name"
        label="Last name"
        name="last_name"
        class="form__element form__element--half form__element--half-even"
        :valid="$v.billingInfo.last_name.required"
        :error-message="'Last name is required'"
      />
      <SfInput
        v-model="billingInfo.email"
        :value="billingInfo.email"
        label="Email Address"
        name="email"
        class="form__element form__element--half"
        :valid="$v.billingInfo.email.required"
        :error-message="'Email is invalid'"
      />
      <SfInput
        v-model="billingInfo.address1"
        :value="billingInfo.address1"
        label="Address 1"
        name="address1"
        class="form__element form__element--half form__element--half-even"
        :valid="$v.billingInfo.address1.required"
        :error-message="'Address 1 is required'"
      />
      <SfInput
        v-model="billingInfo.address2"
        :value="billingInfo.address2"
        label="Address 2"
        name="address2"
        class="form__element form__element--half"
        :valid="$v.billingInfo.address2.required"
        :error-message="'Address 2 is required'"
      />
      <SfInput
        v-model="billingInfo.city"
        :value="billingInfo.city"
        label="City"
        name="city"
        class="form__element form__element--half form__element--half-even"
        :valid="$v.billingInfo.city.required"
        :error-message="'City is required'"
      />
      <SfInput
        v-model="billingInfo.postal_code"
        :value="billingInfo.postal_code"
        label="Postal-code"
        name="postal_code"
        class="form__element form__element--half"
        :valid="$v.billingInfo.postal_code.required"
        :error-message="'Postal code is required'"
      />
      <SfInput
        v-model="billingInfo.country_code"
        :value="billingInfo.country_code"
        label="Country code"
        name="country_code"
        class="form__element form__element--half form__element--half-even"
        :valid="$v.billingInfo.country_code.required"
        :error-message="'Country code is required'"
      />
      <country-select
        v-model="billingInfo.country"
        :country-name="true"
        :country="billingInfo.country"
        top-country="US"
        class="country_select"
      />
      <span
        v-if="!$v.billingInfo.country.required"
        style="margin-top: -20px; color: red; font-size: 14px"
        >Country is required</span
      >
      <region-select
        v-model="billingInfo.state_or_province"
        :country="billingInfo.country"
        :region="billingInfo.state_or_province"
        :country-name="true"
        :region-name="true"
        class="region_select"
      />
      <span
        v-if="!$v.billingInfo.state_or_province.required"
        style="margin-top: -20px; color: red; font-size: 14px"
        >State is required</span
      >
      <SfInput
        v-model="billingInfo.phone"
        :value="billingInfo.phone"
        label="Phone number"
        name="phone"
        class="form__element"
        :valid="$v.billingInfo.phone.required"
        :error-message="'Phone is required'"
      />
    </div>
    <SfHeading
      title="Payment methods"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div class="payment-methods">
        <SfRadio
          v-for="item in paymentMethods"
          :key="item.value"
          v-model="paymentMethod"
          :label="item.label"
          :value="item.value"
          name="paymentMethod"
          :description="item.description"
          class="form__radio payment-method"
        >
          <template #label>
            <div class="sf-radio__label">
              <template
                v-if="
                  item.value !== 'debit' &&
                  item.value !== 'mastercard' &&
                  item.value !== 'electron'
                "
              >
                {{ item.label }}
              </template>
              <template v-else>
                <SfImage
                  :src="`/assets/storybook/checkout/${item.value}.png`"
                  :alt="item.value"
                  class="payment-image"
                  :lazy="false"
                />
              </template>
            </div>
          </template>
        </SfRadio>
      </div>
      <transition name="sf-fade">
        <div v-if="isCreditCard" class="credit-card-form">
          <SfInput
            v-model="cardNumber"
            :value="cardNumber"
            name="cardNumber"
            label="Card number"
            class="credit-card-form__input"
          />
          <SfInput
            v-model="cardHolder"
            :value="cardHolder"
            label="Card holder"
            name="cardHolder"
            class="credit-card-form__input"
          />
          <div class="credit-card-form__group">
            <span
              class="credit-card-form__label credit-card-form__label--small credit-card-form__label--required"
              >Expiry date:</span
            >
            <div class="credit-card-form__element">
              <SfSelect
                v-model="cardMonth"
                :value="cardMonth"
                label="Month"
                class="credit-card-form__input credit-card-form__input--with-spacer form__select sf-select--underlined"
              >
                <SfSelectOption
                  v-for="monthOption in months"
                  :key="monthOption"
                  :value="monthOption"
                >
                  {{ monthOption }}
                </SfSelectOption>
              </SfSelect>
              <SfSelect
                v-model="cardYear"
                :value="cardYear"
                label="Year"
                class="credit-card-form__input form__select sf-select--underlined"
              >
                <SfSelectOption
                  v-for="yearOption in years"
                  :key="yearOption"
                  :value="yearOption"
                >
                  {{ yearOption }}
                </SfSelectOption>
              </SfSelect>
            </div>
          </div>
          <div class="credit-card-form__group">
            <SfInput
              v-model="cardCVC"
              :value="cardCVC"
              type="number"
              label="Code CVC"
              name="cardCVC"
              class="credit-card-form__input credit-card-form__input--small credit-card-form__input--with-spacer"
            />
            <SfButton class="sf-button--text credit-card-form__button"
              >Where can I find CVC code</SfButton
            >
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfRadio,
  SfImage,
  SfCheckbox
} from '@storefront-ui/vue';
import { mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';
export default {
  name: 'Payment',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    SfImage,
    SfCheckbox
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
        email: '',
        address1: '',
        address2: '',
        city: '',
        state_or_province: '',
        country: '',
        country_code: '',
        postal_code: '',
        phone: ''
      },
      paymentMethod: '',
      cardNumber: '',
      cardHolder: '',
      cardMonth: '',
      cardYear: '',
      cardCVC: '',
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      years: ['2020', '2021', '2022', '2025'],
      paymentMethods: [
        {
          label: 'Visa Debit',
          value: 'debit'
        },
        {
          label: 'MasterCard',
          value: 'mastercard'
        },
        {
          label: 'Visa Electron',
          value: 'electron'
        },
        {
          label: 'Cash on delivery',
          value: 'cash'
        },
        {
          label: 'Check',
          value: 'check'
        }
      ]
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
      email: {
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
      'old_billing_address'
    ]),
    isCreditCard() {
      return ['debit', 'mastercard', 'electron'].includes(this.paymentMethod);
    }
  },
  mounted() {
    if (this.billingAddress) {
      this.billingInfo = { ...this.billingAddress };
    } else if (this.old_billing_address !== {}) {
      this.billingInfo = { ...this.old_billing_address };
    }
  },
  destroyed() {
    this.$store.commit('checkout/SET_BILLING_ADDRESS', this.billingInfo);
  },
  methods: {
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
        this.$store.dispatch('checkout/setBillingAddress', this.billingInfo);
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
