<template>
  <div id="my-account">
    <Loader :loading="isLoading" />
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
import { SfBreadcrumbs, SfContentPages } from '@storefront-ui/vue';
import { mapActions, mapGetters } from 'vuex';
import { MyProfile, ShippingDetails, OrderHistory } from './_profile/index.js';
import Loader from '~/components/Loader.vue';
export default {
  name: 'MyAccount',
  components: {
    SfBreadcrumbs,
    SfContentPages,
    MyProfile,
    ShippingDetails,
    OrderHistory,
    Loader
  },
  data() {
    return {
      activePage: 'My profile',
      breadcrumbs: [
        {
          text: 'Home',
          link: '/'
        },
        {
          text: 'My Account',
          link: '/login'
        }
      ]
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
      getAllAddresses: 'address/getAllAddresses'
    }),
    changeActivePage(title) {
      if (title === 'Log out') {
        this.logOut();
      }
      this.activePage = title;
    },
    handleUpdate(address) {
      console.log('update======', address);
    },
    handleAdd(address) {
      console.log('add======', address);
    },
    handleDelete(address) {
      console.log('delete======', address);
    }
  }
};
</script>
<style
  src="~/assets/sass/components/customerprofile.scss"
  lang="scss"
  scoped
></style>
