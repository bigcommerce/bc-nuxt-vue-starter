<template>
  <div id="register-page">
    <div class="register-form">
      <SfSection title-heading="Register" class="sf-heading--underline">
        <SfInput
          ref="first_name"
          v-model="$v.firstName.$model"
          :label="'First Name'"
          :name="'first_name'"
          :valid="checkFormValidation($v.firstName)"
          :placeholder="'Input First Name'"
          :error-message="'First name is required'"
        />
        <SfInput
          ref="last_name"
          v-model="$v.lastName.$model"
          :label="'Last Name'"
          :name="'last_name'"
          :valid="checkFormValidation($v.lastName)"
          :placeholder="'Input Last Name'"
          :error-message="'First name is required'"
        />
        <SfInput
          ref="email"
          v-model="$v.email.$model"
          :label="'Email'"
          :name="'email'"
          :valid="$v.email.email && checkFormValidation($v.email)"
          :placeholder="'Input Email'"
          :error-message="'Email is invalid'"
        />
        <SfInput
          ref="phone"
          v-model="$v.phone.$model"
          :label="'Phone'"
          :name="'phone'"
          :valid="checkFormValidation($v.phone)"
          :placeholder="'Input Phone Number'"
          :error-message="'Phone number is required'"
        />
        <SfInput
          ref="password"
          v-model="$v.password.$model"
          :type="'password'"
          :label="'Password'"
          :name="'password'"
          :valid="
            $v.password.minLength &&
            pwdValidate(password) &&
            checkFormValidation($v.password)
          "
          :placeholder="'Input Password'"
          :error-message="pwdError"
        />
        <SfInput
          ref="cpassword"
          v-model="$v.cpassword.$model"
          :type="'password'"
          :label="'Confirm Password'"
          :name="'cpassword'"
          :valid="
            checkFormValidation($v.cpassword) && $v.cpassword.sameAsPassword
          "
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
          <SfButton
            link="/login"
            class="sf-button sf-button--text action-button"
            >or Log In To Your Account</SfButton
          >
        </div>
      </SfSection>
    </div>
  </div>
</template>
<script>
import { SfInput, SfButton, SfSection } from '@storefront-ui/vue';
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { passwordRegexValidate, checkFormValidation } from '~/utils/validation';

export default {
  name: 'RegisterPage',
  components: {
    SfInput,
    SfButton,
    SfSection
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
    checkFormValidation,
    pwdValidate(val) {
      if (!this.$v.password.$dirty) return true;
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
