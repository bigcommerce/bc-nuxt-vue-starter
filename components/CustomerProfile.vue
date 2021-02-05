<template>
  <SfContentPages
    title="My Account"
    :active="activeTabName"
    @click:change="handleChangeTab"
  >
    <SfHeading
      :level="4"
      title="Your Store Credit"
      :description="`${customer.storeCredit.currencyCode} ${customer.storeCredit.value}`"
    />
    <SfContentPage :title="profileTabs[0]">
      <SfTabs :open-tab="1">
        <SfTab title="Personal Data">
          <SfInput :label="'First Name'" :value="customer.firstName" readonly />
          <SfInput :label="'Last Name'" :value="customer.lastName" readonly />
          <SfInput :label="'Email'" :value="customer.email" readonly />
          <SfInput :label="'Phone'" :value="customer.phone" readonly />
        </SfTab>
        <SfTab title="Additional Data">
          <SfInput :label="'Company'" :value="customer.company" readonly />
          <SfInput
            :label="'Tax Exempt Category'"
            :value="customer.taxExemptCategory"
            readonly
          />
          <SfInput :label="'Notes'" :value="customer.notes" readonly />
          <SfInput
            :label="'Address Count'"
            :value="customer.addressCount"
            readonly
          />
          <SfInput
            :label="'Attribute Count'"
            :value="customer.attributeCount"
            readonly
          />
        </SfTab>
      </SfTabs>
    </SfContentPage>
    <SfContentPage :title="profileTabs[1]"></SfContentPage>
  </SfContentPages>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { SfContentPages, SfTabs, SfInput, SfHeading } from '@storefront-ui/vue';
export default {
  components: {
    SfTabs,
    SfContentPages,
    SfInput,
    SfHeading
  },
  data() {
    return {
      profileTabs: ['Personal Details', 'Log Out'],
      activeTabName: 'Personal Details'
    };
  },
  computed: {
    ...mapGetters('customer', ['customer'])
  },
  methods: {
    logOut: 'customer/logOut',
    ...mapActions({
      logOut: 'customer/logOut',
      updateAccount: 'customer/updateAccount'
    }),
    handleChangeTab(TabName) {
      if (!TabName) {
        this.activeTabName = '';
      } else if (TabName === this.profileTabs[1]) {
        this.logOut();
      } else if (TabName === this.profileTabs[0]) {
        this.activeTabName = this.profileTabs[0];
      }
    }
  }
};
</script>

<style></style>
