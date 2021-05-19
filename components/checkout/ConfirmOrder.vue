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
      <div class="form">
        <SfHeading
          title="Payment methods"
          :level="3"
          class="sf-heading--left sf-heading--no-underline title"
        />
        <div class="payment-methods">
          <SfRadio
            v-for="item in paymentMethods"
            :key="item.value"
            v-model="paymentMethod"
            :label="item.label"
            :value="item.value"
            name="paymentMethod"
            :description="item.description"
            class="form__radio payment-method"
          >
            <template #label>
              <div class="sf-radio__label">
                <template
                  v-if="
                    item.value !== 'debit' &&
                    item.value !== 'mastercard' &&
                    item.value !== 'electron'
                  "
                >
                  {{ item.label }}
                </template>
                <template v-else>
                  <SfImage
                    :src="`/assets/storybook/checkout/${item.value}.png`"
                    :alt="item.value"
                    class="payment-image"
                    :lazy="false"
                  />
                </template>
              </div>
            </template>
          </SfRadio>
        </div>
        <transition name="sf-fade">
          <div v-if="isCreditCard" class="credit-card-form">
            <SfInput
              v-model="cardNumber"
              :value="cardNumber"
              name="cardNumber"
              label="Card number"
              class="credit-card-form__input"
            />
            <SfInput
              v-model="cardHolder"
              :value="cardHolder"
              label="Card holder"
              name="cardHolder"
              class="credit-card-form__input"
            />
            <div class="credit-card-form__group">
              <span
                class="credit-card-form__label credit-card-form__label--small credit-card-form__label--required"
                >Expiry date:</span
              >
              <div class="credit-card-form__element">
                <SfSelect
                  v-model="cardMonth"
                  :value="cardMonth"
                  label="Month"
                  class="credit-card-form__input credit-card-form__input--with-spacer form__select sf-select--underlined"
                >
                  <SfSelectOption
                    v-for="monthOption in months"
                    :key="monthOption"
                    :value="monthOption"
                  >
                    {{ monthOption }}
                  </SfSelectOption>
                </SfSelect>
                <SfSelect
                  v-model="cardYear"
                  :value="cardYear"
                  label="Year"
                  class="credit-card-form__input form__select sf-select--underlined"
                >
                  <SfSelectOption
                    v-for="yearOption in years"
                    :key="yearOption"
                    :value="yearOption"
                  >
                    {{ yearOption }}
                  </SfSelectOption>
                </SfSelect>
              </div>
            </div>
            <div class="credit-card-form__group">
              <SfInput
                v-model="cardCVC"
                :value="cardCVC"
                type="number"
                label="Code CVC"
                name="cardCVC"
                class="credit-card-form__input credit-card-form__input--small credit-card-form__input--with-spacer"
              />
              <SfButton class="sf-button--text credit-card-form__button"
                >Where can I find CVC code</SfButton
              >
            </div>
          </div>
        </transition>
      </div>
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
  SfLink,
  SfButton,
  SfSelect,
  SfRadio,
  SfInput
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
    SfLink,
    SfButton,
    SfSelect,
    SfRadio,
    SfInput
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
      tableHeaders: ['Description', 'Quantity', 'Amount'],
      paymentMethods: [
        {
          label: 'Visa Debit',
          value: 'debit'
        },
        {
          label: 'MasterCard',
          value: 'mastercard'
        },
        {
          label: 'Visa Electron',
          value: 'electron'
        },
        {
          label: 'Cash on delivery',
          value: 'cash'
        },
        {
          label: 'Check',
          value: 'check'
        }
      ],
      paymentMethod: '',
      cardNumber: '',
      cardHolder: '',
      cardMonth: '',
      cardYear: '',
      cardCVC: '',
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      years: ['2020', '2021', '2022', '2025']
    };
  },
  computed: {
    ...mapGetters('carts', ['products']),
    ...mapGetters('checkout', ['shippingMethod']),
    isCreditCard() {
      return ['debit', 'mastercard', 'electron'].includes(this.paymentMethod);
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
