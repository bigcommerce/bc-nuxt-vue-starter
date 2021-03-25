<template>
  <div id="my-account">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      title="My Account"
      :active="activePage"
      class="my-account"
      @click:change="changeActivePage"
    >
      <SfContentCategory title="Personal Details">
        <SfContentPage title="My profile">
          <MyProfile :account="customer" />
        </SfContentPage>
        <SfContentPage title="Shipping details">
          <ShippingDetails
            :addresses="addresses"
            @update:address="handleUpdate"
            @add:address="handleAdd"
            @delete:address="handleDelete"
          />
        </SfContentPage>
      </SfContentCategory>
      <SfContentCategory title="Order details">
        <SfContentPage title="Order history">
          <OrderHistory :orders="orders" />
        </SfContentPage>
      </SfContentCategory>
      <SfContentPage title="Log out" />
    </SfContentPages>
  </div>
</template>
<script>
import { breadcrumbs } from '@/constants';
import { SfBreadcrumbs, SfContentPages } from '@storefront-ui/vue';
import { mapActions, mapGetters } from 'vuex';
import { MyProfile, ShippingDetails, OrderHistory } from './_profile/index.js';
export default {
  name: 'MyAccount',
  components: {
    SfBreadcrumbs,
    SfContentPages,
    MyProfile,
    ShippingDetails,
    OrderHistory
  },
  data() {
    return {
      activePage: 'My profile',
      breadcrumbs
    };
  },
  computed: {
    ...mapGetters('customer', ['customer']),
    ...mapGetters('order', ['orders', 'isLoading']),
    ...mapGetters('address', ['addresses', 'isLoading'])
  },
  mounted() {
    this.getAllOrders();
    this.getAllAddresses();
  },
  methods: {
    ...mapActions({
      logOut: 'customer/logOut',
      getAllOrders: 'order/getAllOrders',
      getAllAddresses: 'address/getAllAddresses',
      updateAddress: 'address/updateAddress',
      addAddress: 'address/addAddress',
      deleteAddress: 'address/deleteAddress'
    }),
    changeActivePage(title) {
      if (title === 'Log out') {
        this.logOut();
      }
      this.activePage = title;
    },
    handleUpdate(address) {
      this.updateAddress(address);
    },
    handleAdd(address) {
      this.addAddress(address);
    },
    handleDelete(address) {
      this.deleteAddress({
        customerId: address.customer_id,
        addressId: address.id
      });
    }
  }
};
</script>
<style
  src="~/assets/sass/components/customerprofile.scss"
  lang="scss"
  scoped
></style>
