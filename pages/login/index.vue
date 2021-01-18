<template>
  <div id="login">
    <div v-if="loggedIn" class="profile-form">
      <div>User Name: {{ `${customer.firstName} ${customer.lastName}` }}</div>
      <div>User Email: {{ `${customer.email}` }}</div>
      <SfButton @click="handleLogOut">Log Out</SfButton>
    </div>
    <div v-else class="login-form">
      <h1 class="title">Log In</h1>
      <SfInput
        ref="email"
        v-model="emailValue"
        :type="'text'"
        :label="'Email'"
        :name="'email'"
        :valid="emailValid"
        :required="true"
        :disabled="false"
        :placeholder="'Input Email Address'"
      />
      <SfInput
        v-model="pwdValue"
        :type="'password'"
        :label="'Password'"
        :name="'password'"
        :valid="pwdValid"
        :disabled="false"
        :placeholder="'Input Password'"
      />
      <SfButton :disabled="btnDisabled" @click="handleLogin">Log In</SfButton>
    </div>
  </div>
</template>
<script>
import { SfInput, SfButton } from '@storefront-ui/vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    SfInput,
    SfButton
  },
  layout: 'Default',
  data() {
    return {
      emailValue: '',
      emailValid: false,
      pwdValue: '',
      pwdValid: false
    };
  },
  computed: {
    ...mapGetters('customer', ['loggedIn', 'customer']),
    btnDisabled() {
      return !(this.emailValid && this.pwdValid);
    }
  },
  watch: {
    emailValue(val) {
      val ? (this.emailValid = true) : (this.emailValid = false);
    },
    pwdValue(val) {
      val ? (this.pwdValid = true) : (this.pwdValid = false);
    }
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    ...mapActions({
      login: 'customer/login',
      checkLogin: 'customer/isLoggedIn',
      logOut: 'customer/logOut'
    }),
    async handleLogin() {
      await this.login({ email: this.emailValue, password: this.pwdValue });
    },
    handleLogOut() {
      this.logOut();
    }
  }
};
</script>
<style src="~/assets/sass/pages/login.scss" lang="scss" scoped></style>
