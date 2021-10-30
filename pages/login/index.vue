<template>
  <div id="login-page">
    <div v-if="loggedIn">
      <CustomerProfile />
    </div>
    <div v-else class="login-row">
      <SfSection title-heading="Log In" class="sf-heading--underline">
        <div class="customer-form">
          <div class="login-form">
            <SfInput
              ref="email"
              v-model="$v.email.$model"
              :type="'text'"
              :label="'Email'"
              :name="'email'"
              :valid="checkFormValidation($v.email)"
              :placeholder="'Input Email Address'"
              :error-message="'Email is required'"
            />
            <SfInput
              v-model="$v.password.$model"
              :type="'password'"
              :label="'Password'"
              :name="'password'"
              :valid="checkFormValidation($v.password)"
              :placeholder="'Input Password'"
              :error-message="'Password is required'"
            />
            <SfButton :disabled="btnDisabled" @click="handleLogin"
              >Log In</SfButton
            >
          </div>
          <div class="new-customer-form">
            <div class="new-customer">
              <div class="panel">
                <div class="panel-header">
                  <h2 class="panel-title sf-heading__title">New Customer?</h2>
                </div>
                <div class="panel-body">
                  <p class="new-customer-intro">
                    Create an account with us and you'll be able to:
                  </p>
                  <ul class="new-customer-fact-list">
                    <li>Check out faster</li>
                    <li>Save multiple shipping addresses</li>
                    <li>Access your order history</li>
                    <li>Track new orders</li>
                    <li>Save items to your Wish List</li>
                  </ul>
                  <SfButton link="/register">Create</SfButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SfSection>
    </div>
  </div>
</template>
<script>
import { SfInput, SfButton, SfSection } from '@storefront-ui/vue';
import { mapGetters, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import CustomerProfile from '~/components/CustomerProfile.vue';
import { checkFormValidation } from '~/utils/validation';
export default {
  components: {
    SfInput,
    SfButton,
    CustomerProfile,
    SfSection
  },
  layout: 'Default',
  data() {
    return {
      email: null,
      password: null
    };
  },
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  },
  computed: {
    ...mapGetters('customer', ['loggedIn', 'loginCred']),
    btnDisabled() {
      return this.$v.$invalid;
    }
  },
  watch: {},
  activated() {
    if (this.loginCred) {
      this.email = this.loginCred.email;
      this.password = this.loginCred.password;
    }
  },
  methods: {
    ...mapActions({
      login: 'customer/login'
    }),
    checkFormValidation,
    async handleLogin() {
      await this.login({ email: this.email, password: this.password });
    }
  }
};
</script>
<style src="~/assets/sass/pages/login.scss" lang="scss" scoped></style>
