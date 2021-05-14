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
        class="form__element form__element--half"
        :valid="$v.shippingInfo.postal_code.required"
        :error-message="'Postal code is required'"
      />
      <SfInput
        v-model="shippingInfo.country_code"
        :value="shippingInfo.country_code"
        label="Country code"
        name="country_code"
        class="form__element form__element--half form__element--half-even"
        :valid="$v.shippingInfo.country_code.required"
        :error-message="'Country code is required'"
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
        :region-name="true"
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
          v-for="item in sMethods"
          :key="item.id"
          v-model="shMethod"
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
import { SfHeading, SfInput, SfRadio } from '@storefront-ui/vue';
import { mapGetters } from 'vuex';
import SpDropdown from '@/components/checkout/basic/SpDropdown.vue';
import { required } from 'vuelidate/lib/validators';
export default {
  name: 'Shipping',
  components: {
    SfHeading,
    SfInput,
    SfRadio,
    SpDropdown
  },
  data() {
    return {
      shippingInfo: {
        first_name: 'leo',
        last_name: 'pard',
        email: 'leopard@gmail.com',
        address1: 'street 1',
        address2: 'street 2',
        city: 'Burnaby',
        state_or_province: 'Ontario',
        country: 'Canada',
        country_code: 'CA',
        postal_code: '235654',
        phone: '2356346674'
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
      'old_consignments',
      'line_items',
      'shippingAddress'
    ]),
    sMethods() {
      if (this.old_consignments.length) {
        return this.old_consignments[0].available_shipping_options;
      }
      return [];
    }
  },
  mounted() {
    if (this.shippingAddress) {
      this.shippingInfo = { ...this.shippingAddress };
    }
  },
  destroyed() {
    this.$store.commit('checkout/SET_SHIPPING_ADDRESS', this.shippingInfo);
    this.$store.commit('checkout/SET_SHIPPING_METHODS', this.shMethod);
  },
  methods: {
    handleSetAddress(action) {
      if (action) {
        Object.keys(this.shippingInfo).map(
          (key) => (this.shippingInfo[key] = action?.shipping_address[key])
        );
      } else {
        Object.keys(this.shippingInfo).map(
          (key) => (this.shippingInfo[key] = '')
        );
      }
    },
    runAction() {
      if (!this.$v.$invalid) {
        this.$store.dispatch('checkout/setShippingAddress', {
          shipping_address: this.shippingInfo,
          shippingOptionId: this.shMethod
        });
      }
      return !this.$v.$invalid;
    }
  }
};
</script>
<style
  src="~/assets/sass/components/checkout/shipping.scss"
  lang="scss"
  scoped
></style>
