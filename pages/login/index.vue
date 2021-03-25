<template>
  <div id="login-page">
    <div v-if="loggedIn">
      <CustomerProfile />
    </div>
    <div v-else class="login-row">
      <h1 class="page-header">Log In</h1>
      <div class="customer-form">
        <div class="login-form">
          <SfInput
            ref="email"
            v-model="email"
            :type="'text'"
            :label="'Email'"
            :name="'email'"
            :valid="$v.email.required"
            :placeholder="'Input Email Address'"
            :error-message="'Email is required'"
          />
          <SfInput
            v-model="password"
            :type="'password'"
            :label="'Password'"
            :name="'password'"
            :valid="$v.password.required"
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
                <h2 class="panel-title">New Customer?</h2>
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
    </div>
  </div>
</template>
<script>
import { SfInput, SfButton } from '@storefront-ui/vue';
import { mapGetters, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import CustomerProfile from '~/components/CustomerProfile.vue';
export default {
  components: {
    SfInput,
    SfButton,
    CustomerProfile
  },
  layout: 'Default',
  data() {
    return {
      email: '',
      password: ''
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
    ...mapGetters('customer', ['loggedIn', 'isLoading']),
    btnDisabled() {
      return this.$v.$invalid;
    }
  },
  watch: {},
  mounted() {
    this.checkLogin();
  },
  methods: {
    ...mapActions({
      login: 'customer/login',
      checkLogin: 'customer/isLoggedIn'
    }),
    async handleLogin() {
      await this.login({ email: this.email, password: this.password });
    }
  }
};
</script>
<style src="~/assets/sass/pages/login.scss" lang="scss" scoped></style>
