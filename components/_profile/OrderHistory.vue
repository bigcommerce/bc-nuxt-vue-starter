<template>
  <SfTabs :open-tab="1">
    <SfTab title="My orders">
      <p class="message">Your order history.</p>
      <div v-if="orders.length === 0" class="no-orders">
        <p class="no-orders__title">You currently have no order history.</p>
        <SfButton
          link="/shop-all"
          class="no-orders__button"
          style="color: white; font-weight: bold"
          >Start shopping</SfButton
        >
      </div>
      <SfTable v-else class="orders">
        <SfTableHeading>
          <SfTableHeader v-for="tableHeader in tableHeaders" :key="tableHeader"
            >{{ tableHeader }}
          </SfTableHeader>
        </SfTableHeading>
        <SfTableRow v-for="order in orders" :key="order[0]">
          <SfTableData v-for="(data, key) in order" :key="key">
            <template v-if="key === 4">
              <span
                :class="{
                  'text-success': data === 'Finalised',
                  'text-warning': data === 'In process',
                  'text-danger': data === 'Cancelled',
                  'text-primary': data === 'Awaiting Fulfillment',
                  'text-info': data === 'Incomplete'
                }"
                >{{ data }}</span
              >
            </template>
            <template v-else>{{ data }}</template>
          </SfTableData>
        </SfTableRow>
      </SfTable>
    </SfTab>
  </SfTabs>
</template>
<script>
import { SfTabs, SfTable, SfButton } from '@storefront-ui/vue';
export default {
  name: 'PersonalDetails',
  components: {
    SfTabs,
    SfTable,
    SfButton
  },
  props: {
    orders: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableHeaders: [
        'Order ID',
        'Payment date',
        'Payment method',
        'Amount',
        'Status'
      ]
    };
  }
};
</script>
<style src="~/assets/sass/components/orders.scss" lang="scss" scoped></style>
