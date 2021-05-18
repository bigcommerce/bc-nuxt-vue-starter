<template>
  <div id="confirm-order">
    <SfHeading
      title="Order details"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfTable class="sf-table--bordered table">
      <SfTableHeading class="table__row">
        <SfTableHeader class="table__header table__image">Item</SfTableHeader>
        <SfTableHeader
          v-for="tableHeader in tableHeaders"
          :key="tableHeader"
          class="table__header"
          :class="{ table__description: tableHeader === 'Description' }"
          >{{ tableHeader }}
        </SfTableHeader>
      </SfTableHeading>
      <SfTableRow
        v-for="(product, index) in products"
        :key="index"
        class="table__row"
      >
        <SfTableData class="table__image">
          <SfImage :src="product.image" :alt="product.title" />
        </SfTableData>
        <SfTableData class="table__description">
          <div class="product-title">{{ product.title }}</div>
        </SfTableData>
        <SfTableData class="table__data">{{ product.qty }}</SfTableData>
        <SfTableData class="table__data">
          <SfPrice
            :regular="product.price.regular"
            :special="product.price.special"
            class="product-price"
          />
        </SfTableData>
      </SfTableRow>
    </SfTable>
    <div class="summary smartphone-only">
      <div class="summary__content">
        <SfProperty
          name="Subtotal"
          :value="subtotal"
          class="sf-property--full-width property"
        />
        <SfProperty
          name="Shipping"
          :value="shippingMethod ? '$' + shippingMethod.cost : '$0'"
          class="sf-property--full-width property"
        />
        <SfDivider class="divider" />
        <SfProperty
          name="Total price"
          :value="total"
          class="sf-property--full-width property"
        />
        <SfCheckbox v-model="terms" name="terms" class="summary__terms">
          <template #label>
            <div class="sf-checkbox__label">
              I agree to <a href="#">Terms and conditions</a>
            </div>
          </template>
        </SfCheckbox>
      </div>
    </div>
    <div class="totals desktop-only">
      <SfProperty
        name="Subtotal"
        :value="subtotal"
        class="sf-property--full-width property property__subtotal"
      >
      </SfProperty>
      <SfProperty
        name="Shipping"
        :value="shippingMethod ? '$' + shippingMethod.cost : '$0'"
        class="sf-property--full-width property"
      >
      </SfProperty>
      <SfDivider class="divider" />
      <SfProperty
        name="Total price"
        :value="total"
        class="sf-property--full-width sf-property--large property__total"
      >
      </SfProperty>
      <SfCheckbox v-model="terms" name="terms" class="totals__terms">
        <template #label>
          <div class="sf-checkbox__label">
            I agree to <SfLink href="#">Terms and conditions</SfLink>
          </div>
        </template>
      </SfCheckbox>
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfTable,
  SfCheckbox,
  SfDivider,
  SfImage,
  SfPrice,
  SfProperty,
  SfLink
} from '@storefront-ui/vue';
import { mapGetters } from 'vuex';
export default {
  name: 'ReviewOrder',
  components: {
    SfHeading,
    SfTable,
    SfCheckbox,
    SfDivider,
    SfImage,
    SfPrice,
    SfProperty,
    SfLink
  },
  props: {
    characteristics: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      terms: false,
      promoCode: '',
      tableHeaders: ['Description', 'Quantity', 'Amount']
    };
  },
  computed: {
    ...mapGetters('carts', ['products']),
    ...mapGetters('checkout', ['shippingMethod']),
    paymentMethod() {
      return { label: '' };
    },
    subtotal() {
      const subtotal = this.products.reduce((previous, current) => {
        const qty = current.qty;
        const price = current.price.special
          ? current.price.special
          : current.price.regular;
        const total = qty * parseFloat(price);
        return previous + total;
      }, 0);
      return '$' + subtotal.toFixed(2);
    },
    total() {
      const subtotal = parseFloat(this.subtotal.replace('$', ''));
      const shipping = parseFloat(this.shippingMethod.cost);
      const total = subtotal + shipping;
      return '$' + total.toFixed(2);
    }
  },
  methods: {
    runAction() {
      this.$store.dispatch('checkout/createOrder');
      return true;
    }
  }
};
</script>
<style
  src="~/assets/sass/components/checkout/confirmorder.scss"
  lang="scss"
  scoped
></style>
