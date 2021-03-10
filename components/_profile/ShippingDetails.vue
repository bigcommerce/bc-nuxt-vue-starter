<template>
  <transition name="sf-fade">
    <SfTabs
      v-if="editAddress"
      key="edit-address"
      :open-tab="1"
      class="tab-orphan"
    >
      <SfTab title="Change the address">
        <p class="message">Keep your addresses and contact details updated.</p>
        <div class="form">
          <SfInput
            v-model="address.company"
            name="company"
            label="Company"
            class="form__element form__element--half"
            :valid="$v.address.company.required"
            :error-message="'Company is required'"
          />
          <SfComponentSelect
            v-model="address.address_type"
            name="address_type"
            label="Address Type"
            :valid="$v.address.address_type.required"
            :error-message="'Address Type is required'"
            class="sf-component-select--underlined form__select form__element form__element--half form__element--half-even"
          >
            <SfComponentSelectOption
              v-for="address_type in address_types"
              :key="address_type"
              :value="address_type"
            >
              {{ address_type }}
            </SfComponentSelectOption>
          </SfComponentSelect>
          <SfInput
            v-model="address.first_name"
            name="firstName"
            label="First Name"
            :valid="$v.address.first_name.required"
            :error-message="'First Name is required'"
            class="form__element form__element--half"
          />
          <SfInput
            v-model="address.last_name"
            name="lastName"
            label="Last Name"
            :valid="$v.address.last_name.required"
            :error-message="'Last Name is required'"
            class="form__element form__element--half form__element--half-even"
          />
          <SfInput
            v-model="address.street_1"
            name="street_1"
            label="Street 1"
            :valid="$v.address.street_1.required"
            :error-message="'Street 1 is required'"
            class="form__element"
          />
          <SfInput
            v-model="address.street_2"
            name="street_2"
            label="Street 2"
            :valid="$v.address.street_2.required"
            :error-message="'Street 2 is required'"
            class="form__element"
          />
          <SfInput
            v-model="address.city"
            name="city"
            label="City"
            :valid="$v.address.city.required"
            :error-message="'City is required'"
            class="form__element form__element--half"
          />
          <region-select
            v-model="address.state"
            :country="address.country"
            :region="address.state"
            :region-name="true"
            :country-name="true"
            class="region_select"
          />
          <span
            v-if="!$v.address.state.required"
            style="margin-top: -20px; color: red; font-size: 14px"
            >State is required</span
          >
          <SfInput
            v-model="address.zip"
            name="zip"
            label="Zip-code"
            :valid="$v.address.zip.required"
            :error-message="'ZipCode is required'"
            class="form__element"
          />
          <country-select
            v-model="address.country"
            :country-name="true"
            :country="address.country"
            top-country="US"
            class="country_select"
          />
          <span
            v-if="!$v.address.country.required"
            style="margin-top: -20px; color: red; font-size: 14px"
            >Country is required</span
          >
          <SfInput
            v-model="address.phone"
            name="phone"
            label="Phone number"
            :valid="$v.address.phone.required"
            :error-message="'Phone Number is required'"
            class="form__element"
          />
          <SfButton class="action-button" @click="updateAddress(action)"
            >{{ action }} the address</SfButton
          >
        </div>
      </SfTab>
    </SfTabs>
    <SfTabs v-else key="address-list" :open-tab="1" class="tab-orphan">
      <SfTab title="Shipping details">
        <p class="message">
          Manage all the shipping addresses you want (work place, home address
          ...) This way you won't have to enter the shipping address manually
          with each order.
        </p>
        <transition-group tag="div" name="sf-fade" class="shipping-list">
          <div v-for="(item, key) in addresses" :key="item.id" class="shipping">
            <div class="shipping__content">
              <p class="shipping__address">
                <span class="shipping__client-name"
                  >{{ item.first_name }} {{ item.last_name }} </span
                ><br />
                {{ item.street_1 }} {{ item.street_2 }}<br />{{ item.zip }}
                {{ item.city }},<br />{{ item.country }}
              </p>
              <p class="shipping__address">
                {{ item.phone }}
              </p>
            </div>
            <div class="shipping__actions">
              <SfIcon
                icon="cross"
                color="gray"
                size="14px"
                role="button"
                class="smartphone-only"
                @click="deleteAddress(key)"
              />
              <SfButton @click="changeAddress(key, 'update')">Change</SfButton>
              <SfButton
                class="shipping__button-delete desktop-only"
                @click="deleteAddress(key)"
                >Delete</SfButton
              >
            </div>
          </div>
        </transition-group>
        <SfButton class="action-button" @click="changeAddress(-1, 'add')"
          >Add new address</SfButton
        >
      </SfTab>
    </SfTabs>
  </transition>
</template>
<script>
import {
  SfTabs,
  SfInput,
  SfButton,
  SfIcon,
  SfComponentSelect
} from '@storefront-ui/vue';
import { required } from 'vuelidate/lib/validators';
export default {
  name: 'ShippingDetails',
  components: {
    SfTabs,
    SfInput,
    SfButton,
    SfIcon,
    SfComponentSelect
  },
  props: {
    addresses: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      editAddress: false,
      editedAddress: -1,
      address: {
        address_type: '',
        city: '',
        company: '',
        country: '',
        customer_id: '',
        first_name: '',
        id: '',
        last_name: '',
        phone: '',
        state: '',
        street_1: '',
        street_2: '',
        zip: ''
      },
      action: '',
      address_types: ['residential', 'commercial']
    };
  },
  validations: {
    address: {
      company: {
        required
      },
      address_type: {
        required
      },
      first_name: {
        required
      },
      last_name: {
        required
      },
      street_1: {
        required
      },
      street_2: {
        required
      },
      city: {
        required
      },
      state: {
        required
      },
      zip: {
        required
      },
      country: {
        required
      },
      phone: {
        required
      }
    }
  },
  methods: {
    changeAddress(index, action) {
      this.action = action;
      if (index > -1) {
        const address = this.addresses[index];
        this.address = { ...address };
      }
      if (action === 'add') this.address = this.getEmptyAddress(this.address);
      this.editAddress = true;
    },
    updateAddress(action) {
      if (this.$v.address.$invalid) {
        this.$toast.error('Please input required fields');
        return;
      }
      this.$emit(`${action}:address`, this.address);
      this.editAddress = false;
    },
    deleteAddress(index) {
      const address = this.addresses[index];
      this.$emit('delete:address', address);
    },
    getEmptyAddress(address) {
      const newAddress = { ...address };
      Object.keys(newAddress).forEach((k) => (newAddress[k] = ''));
      return newAddress;
    }
  }
};
</script>
<style
  src="~/assets/sass/components/shippingaddress.scss"
  lang="scss"
  scoped
></style>
