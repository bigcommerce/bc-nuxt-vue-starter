<template>
  <div>
    <SfHeading
      title="Shipping"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SpDropdown
      :consignments="old_consignments"
      @click:setAddress="handleSetAddress"
    ></SpDropdown>
    <div class="form">
      <SfInput
        v-model="shippingInfo.first_name"
        :value="shippingInfo.first_name"
        label="First name"
        name="first_name"
        class="form__element form__element--half"
        :valid="$v.shippingInfo.first_name.required"
        :error-message="'First name is required'"
      />
      <SfInput
        v-model="shippingInfo.last_name"
        :value="shippingInfo.last_name"
        label="Last name"
        name="last_name"
        class="form__element form__element--half form__element--half-even"
        :valid="$v.shippingInfo.last_name.required"
        :error-message="'Last name is required'"
      />
      <SfInput
        v-model="shippingInfo.email"
        :value="shippingInfo.email"
        label="Email Address"
        name="email"
        class="form__element form__element--half"
        :valid="$v.shippingInfo.email.required"
        :error-message="'Email is invalid'"
      />
      <SfInput
        v-model="shippingInfo.address1"
        :value="shippingInfo.address1"
        label="Address 1"
        name="address1"
        class="form__element form__element--half form__element--half-even"
        :valid="$v.shippingInfo.address1.required"
        :error-message="'Address 1 is required'"
      />
      <SfInput
        v-model="shippingInfo.address2"
        :value="shippingInfo.address2"
        label="Address 2"
        name="address2"
        class="form__element form__element--half"
        :valid="$v.shippingInfo.address2.required"
        :error-message="'Address 2 is required'"
      />
      <SfInput
        v-model="shippingInfo.city"
        :value="shippingInfo.city"
        label="City"
        name="city"
        class="form__element form__element--half form__element--half-even"
        :valid="$v.shippingInfo.city.required"
        :error-message="'City is required'"
      />
      <SfInput
        v-model="shippingInfo.postal_code"
        :value="shippingInfo.postal_code"
        label="Postal-code"
        name="postal_code"
        class="form__element"
        :valid="$v.shippingInfo.postal_code.required"
        :error-message="'Postal code is required'"
      />
      <country-select
        v-model="shippingInfo.country"
        :country-name="true"
        :country="shippingInfo.country"
        top-country="US"
        class="country_select"
      />
      <span
        v-if="!$v.shippingInfo.country.required"
        style="margin-top: -20px; color: red; font-size: 14px"
        >Country is required</span
      >
      <region-select
        v-model="shippingInfo.state_or_province"
        :country="shippingInfo.country"
        :region="shippingInfo.state_or_province"
        :country-name="true"
        class="region_select"
      />
      <span
        v-if="!$v.shippingInfo.state_or_province.required"
        style="margin-top: -20px; color: red; font-size: 14px"
        >State is required</span
      >
      <SfInput
        v-model="shippingInfo.phone"
        :value="shippingInfo.phone"
        label="Phone number"
        name="phone"
        class="form__element"
        :valid="$v.shippingInfo.phone.required"
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
          v-for="item in []"
          :key="item.value"
          v-model="shMethod"
          :label="item.label"
          :value="item.value"
          name="shippingMethod"
          :description="item.description"
          class="form__radio shipping"
        >
          <template #label="{ label }">
            <div class="sf-radio__label shipping__label">
              <div>
                {{ label }}
                <SfButton
                  class="sf-button--text shipping__action desktop-only"
                  :class="{ 'shipping__action--is-active': item.isOpen }"
                  @click="item.isOpen = !item.isOpen"
                  >{{ item.isOpen ? '- info' : '+ info' }}
                </SfButton>
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
                <div v-if="item.isOpen" class="shipping__info">
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
import { SfHeading, SfInput, SfButton, SfRadio } from '@storefront-ui/vue';
import { mapGetters } from 'vuex';
import SpDropdown from '@/components/checkout/basic/SpDropdown.vue';
import { required } from 'vuelidate/lib/validators';
export default {
  name: 'Shipping',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfRadio,
    SpDropdown
  },
  data() {
    return {
      cmentId: null,
      shippingInfo: {
        first_name: '',
        last_name: '',
        email: '',
        address1: '',
        address2: '',
        city: '',
        state_or_province: '',
        country: '',
        postal_code: '',
        phone: ''
      },
      shMethod: null
    };
  },
  validations: {
    shippingInfo: {
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
      'old_consignments',
      'line_items',
      'shippingAddress',
      'consignmentId',
      'shippingMethod'
    ])
  },
  mounted() {
    if (this.shippingAddress) {
      this.shippingInfo = { ...this.shippingAddress };
    }
    if (this.consignmentId) {
      this.cmentId = this.consignmentId;
    }
    if (this.shippingMethod) {
      this.shMethod = this.shippingMethod;
    }
  },
  destroyed() {
    this.$store.commit('checkout/SET_SHIPPING_ADDRESS', this.shippingInfo);
    this.$store.commit('checkout/SET_CONSIGNMENT_ID', this.cmentId);
    this.$store.commit('checkout/SET_SHIPPING_METHOD', this.shMethod);
  },
  methods: {
    handleSetAddress(action) {
      if (action) {
        Object.keys(this.shippingInfo).map(
          (key) => (this.shippingInfo[key] = action?.shipping_address[key])
        );
        this.cmentId = action?.id;
      } else {
        Object.keys(this.shippingInfo).map(
          (key) => (this.shippingInfo[key] = '')
        );
        this.cmentId = null;
      }
    },
    runAction() {
      return !this.$v.$invalid;
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
.title {
  --heading-padding: var(--spacer-xl) 0 var(--spacer-lg);
  --heading-title-font-weight: var(--font-weight--bold);
  &:not(:first-of-type) {
    --heading-padding: var(--spacer-base) 0;
  }
  @include for-desktop {
    --heading-title-font-size: var(--h3-font-size);
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-padding: var(--spacer-xl) 0;
  }
}
.form {
  .country_select,
  .region_select {
    width: 100%;
    font-size: 18px;
    border: none;
    border-bottom: 1px solid;
    margin-bottom: 30px;
    padding-bottom: 5px;
  }
  &__element {
    margin: 0 0 var(--spacer-base) 0;
    &:last-of-type {
      margin: 0;
    }
  }
  &__group {
    display: flex;
    align-items: center;
  }
  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--base);
    --select-dropdown-color: blue;
    ::v-deep .sf-select__dropdown {
      margin: 0 0 2px 0;
      font-size: var(--font-size--base);
      font-family: var(--font-family--secondary);
      color: var(--c-link);
    }
  }
  &__radio {
    margin: var(--spacer-xs) 0;
    &:last-of-type {
      margin: var(--spacer-xs) 0 var(--spacer-xl);
    }
    ::v-deep .sf-radio__container {
      --radio-container-padding: var(--spacer-xs);
      @include for-desktop {
        --radio-container-padding: var(--spacer-xs) var(--spacer-xs)
          var(--spacer-xs) var(--spacer-sm);
      }
    }
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    &:last-of-type {
      margin: 0 calc(var(--spacer-2xl) - var(--spacer-sm)) 0 0;
    }
    &__element {
      margin: 0 0 var(--spacer-sm) 0;
      flex: 0 0 100%;
      &--half {
        flex: 1 1 50%;
        &-even {
          padding: 0 0 0 var(--spacer-base);
        }
      }
    }
    &__radio-group {
      flex: 0 0 calc(100% + var(--spacer-sm));
      margin: 0 calc(var(--spacer-sm) * -1);
    }
  }
}
.shipping {
  --radio-container-padding: var(--spacer-sm);
  &__label {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    &-price {
      font-size: var(--font-size--lg);
      text-transform: uppercase;
    }
  }
  &__description {
    --radio-description-margin: 0;
  }
  &__delivery {
    color: var(--c-text-muted);
    font-weight: var(--font-weight--normal);
    display: flex;
    width: 10.625rem;
    @include for-desktop {
      font-weight: var(--font-weight--light);
    }
  }
  &__action {
    margin: 0 0 0 var(--spacer-xs);
    &::before {
      content: '+';
    }
    &--is-active {
      --button-color: var(--c-primary);
      --button-transition: color 150ms linear;
      &::before {
        content: '-';
      }
    }
  }
  @include for-desktop {
    &__label {
      justify-content: space-between;
    }
    &__delivery {
      width: 100%;
    }
  }
}
</style>
