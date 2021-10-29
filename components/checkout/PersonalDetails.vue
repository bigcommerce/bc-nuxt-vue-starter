<template>
  <div id="personal-details">
    <div v-if="!loggedIn" class="log-in">
      <SfButton
        link="/login"
        class="log-in__button sf-button--full-width color-secondary"
        >Log into your account</SfButton
      >
      <p class="log-in__info">or fill the details below:</p>
    </div>
    <SfHeading
      title="Personal details"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <SfInput
        v-model="$v.personalInfo.firstName.$model"
        :value="personalInfo.firstName"
        label="First name"
        name="firstName"
        class="form__element form__element--half"
        :readonly="loggedIn"
        :valid="checkFormValidation($v.personalInfo.firstName)"
        :error-message="'First name is required'"
      />
      <SfInput
        v-model="$v.personalInfo.lastName.$model"
        :value="personalInfo.lastName"
        label="Last name"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        :readonly="loggedIn"
        :valid="checkFormValidation($v.personalInfo.lastName)"
        :error-message="'Last name is required'"
      />
      <SfInput
        v-model="$v.personalInfo.email.$model"
        :value="personalInfo.email"
        label="Your email"
        name="email"
        class="form__element"
        :readonly="loggedIn"
        :valid="
          $v.personalInfo.email.email &&
          checkFormValidation($v.personalInfo.email)
        "
        :error-message="'Email is required'"
      />
      <div class="info">
        <p class="info__heading">Enjoy these perks with your free account!</p>
        <SfCharacteristic
          v-for="(characteristic, key) in characteristics"
          :key="key"
          :description="characteristic.description"
          :icon="characteristic.icon"
          size-icon="24px"
          class="info__characteristic"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfInput,
  SfButton,
  SfHeading,
  SfCharacteristic
} from '@storefront-ui/vue';
import { mapGetters } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';
import { checkFormValidation } from '~/utils/validation';
export default {
  name: 'PersonalDetails',
  components: {
    SfInput,
    SfButton,
    SfHeading,
    SfCharacteristic
  },
  data() {
    return {
      personalInfo: { firstName: '', lastName: '', email: '' },
      characteristics: [
        { description: 'Faster checkout', icon: 'clock' },
        { description: 'Earn credits with every purchase', icon: 'credits' },
        { description: 'Full rewards program benefits', icon: 'rewards' },
        { description: 'Manage your wishlist', icon: 'heart' }
      ]
    };
  },
  validations: {
    personalInfo: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
  computed: {
    ...mapGetters('checkout', ['personalDetails']),
    ...mapGetters('customer', ['customer', 'loggedIn'])
  },
  mounted() {
    if (this.personalDetails) {
      this.personalInfo = { ...this.personalDetails };
    }
    if (this.customer) {
      const tmpCustomer = { ...this.customer };
      Object.keys(this.personalInfo).map(
        (key) => (this.personalInfo[key] = tmpCustomer[key])
      );
    }
  },
  destroyed() {
    this.$store.commit('checkout/SET_PERSONAL_DETAILS', this.personalInfo);
  },
  methods: {
    checkFormValidation,
    runAction() {
      if (this.loggedIn) {
        this.$store.dispatch(
          'carts/updateCartWithCustomerId',
          this.customer.secureData
        );
      }
      return !this.$v.$invalid;
    }
  }
};
</script>
<style
  src="~/assets/sass/components/checkout/personal.scss"
  lang="scss"
  scoped
></style>
