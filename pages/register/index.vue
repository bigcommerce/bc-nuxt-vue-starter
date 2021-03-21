<template>
  <div id="register-page">
    <div class="register-form">
      <h3 class="register-header">Register</h3>
      <SfInput
        ref="first_name"
        v-model="firstName"
        :label="'First Name'"
        :name="'first_name'"
        :valid="$v.firstName.required"
        :placeholder="'Input First Name'"
        :error-message="'First name is required'"
      />
      <SfInput
        ref="last_name"
        v-model="lastName"
        :label="'Last Name'"
        :name="'last_name'"
        :valid="$v.lastName.required"
        :placeholder="'Input Last Name'"
        :error-message="'First name is required'"
      />
      <SfInput
        ref="email"
        v-model="email"
        :label="'Email'"
        :name="'email'"
        :valid="$v.email.email && $v.email.required"
        :placeholder="'Input Email'"
        :error-message="'Email is invalid'"
      />
      <SfInput
        ref="phone"
        v-model="phone"
        :label="'Phone'"
        :name="'phone'"
        :valid="$v.phone.required"
        :placeholder="'Input Phone Number'"
        :error-message="'Phone number is required'"
      />
      <SfInput
        ref="password"
        v-model="password"
        :type="'password'"
        :label="'Password'"
        :name="'password'"
        :valid="
          $v.password.required &&
          this.$v.password.minLength &&
          pwdValidate(password)
        "
        :placeholder="'Input Password'"
        :error-message="pwdError"
      />
      <SfInput
        ref="cpassword"
        v-model="cpassword"
        :type="'password'"
        :label="'Confirm Password'"
        :name="'cpassword'"
        :valid="$v.cpassword.required && $v.cpassword.sameAsPassword"
        :placeholder="'Confirm Your Password'"
        :error-message="'Passwords must be identical'"
      />
      <div class="register-actions">
        <SfButton
          :disabled="!btnDisabled"
          class="sf-button sf-button--full-width"
          @click="handleCreateCustomer"
          >Register</SfButton
        >
        <SfButton link="/login" class="sf-button sf-button--text action-button"
          >or Log In To Your Account</SfButton
        >
      </div>
    </div>
  </div>
</template>
<script>
import { SfInput, SfButton } from '@storefront-ui/vue';
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators';
import { mapGetters, mapActions } from 'vuex';
import { passwordRegexValidate } from '~/utils/validation';

export default {
  name: 'RegisterPage',
  components: {
    SfInput,
    SfButton
  },
  layout: 'Default',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      cpassword: '',
      pwdError: 'Password is required'
    };
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    email: {
      required,
      email
    },
    phone: {
      required
    },
    password: {
      required,
      minLength: minLength(8)
    },
    cpassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  computed: {
    ...mapGetters('customer', ['isLoading']),
    btnDisabled() {
      return !this.$v.$invalid;
    }
  },
  watch: {
    password(val) {
      if (val) {
        this.pwdError = 'Password should be longer than 8 characters';
        if (this.$v.password.minLength) {
          if (!this.pwdValidate(val)) {
            this.pwdError = 'Passsword should be more complex';
          }
        }
      } else {
        this.pwdError = 'Password is required';
      }
    }
  },
  methods: {
    ...mapActions({
      createCustomer: 'customer/createCustomer'
    }),
    pwdValidate(val) {
      return passwordRegexValidate(val);
    },
    handleCreateCustomer() {
      this.createCustomer({
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        phone: this.phone,
        _authentication: {
          password: this.password,
          password_confirmation: this.password
        }
      });
    }
  }
};
</script>
<style src="~/assets/sass/pages/register.scss" lang="scss" scoped></style>
