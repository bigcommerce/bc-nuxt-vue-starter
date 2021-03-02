<template>
  <SfTabs :open-tab="1">
    <SfTab title="Personal data">
      <p class="message">Your profile data</p>
      <div class="form">
        <SfInput
          name="firstName"
          :label="'First Name*'"
          class="form__element form__element--half"
          :value="account.firstName"
          readonly
        />
        <SfInput
          name="lastName"
          :label="'Last Name*'"
          :value="account.lastName"
          class="form__element form__element--half form__element--half-even"
          readonly
        />
        <SfInput
          type="email"
          name="email"
          :label="'Email*'"
          :value="account.email"
          class="form__element"
          readonly
        />
        <SfInput
          name="phone"
          :label="'Phone*'"
          :value="account.phone"
          class="form__element"
          readonly
        />
      </div>
    </SfTab>
    <SfTab title="Additional Data">
      <p class="message">Additional Data</p>
      <div class="form">
        <SfInput
          class="form__element form__element--half"
          :label="'Company*'"
          name="company"
          :value="account.company"
          readonly
        />
        <SfInput
          class="form__element form__element--half form__element--half-even"
          name="tax"
          :label="'Tax Exempt Category*'"
          :value="account.taxExemptCategory"
          readonly
        />
        <SfInput
          class="form__element"
          name="notes"
          :label="'Notes*'"
          :value="account.notes"
          readonly
        />
        <SfInput
          class="form__element form__element--half"
          name="address_count"
          :label="'Address Count*'"
          :value="account.addressCount"
          readonly
        />
        <SfInput
          class="form__element form__element--half form__element--half-even"
          name="attr_count"
          :label="'Attribute Count*'"
          :value="account.attributeCount"
          readonly
        />
      </div>
    </SfTab>
  </SfTabs>
</template>
<script>
import { SfTabs, SfInput } from '@storefront-ui/vue';
export default {
  name: 'PersonalDetails',
  components: {
    SfTabs,
    SfInput
  },
  props: {
    account: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
<style src="~/assets/sass/components/myprofile.scss" lang="scss" scoped></style>
