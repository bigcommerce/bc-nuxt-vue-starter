<template>
  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps :active="currentStep" @change="updateStep($event)">
          <SfStep name="Details">
            <PersonalDetails ref="Personal" />
          </SfStep>
          <SfStep name="Shipping">
            <Shipping ref="Shipping" />
          </SfStep>
          <SfStep name="Payment">
            <Payment ref="Payment" />
          </SfStep>
          <SfStep name="Review">
            <ConfirmOrder
              ref="ConfirmOrder"
              :order="getOrder"
              :characteristics="characteristics"
              @click:edit="currentStep = $event"
            />
          </SfStep>
        </SfSteps>
      </div>
      <div class="checkout__aside">
        <transition name="sf-fade">
          <OrderSummary
            v-if="currentStep <= 2"
            key="order-summary"
            class="checkout__aside-order"
            :characteristics="characteristics"
          />
          <OrderReview
            v-else
            key="order-review"
            class="checkout__aside-order"
            :characteristics="characteristics"
            @click:edit="currentStep = $event"
          />
        </transition>
      </div>
    </div>
    <div class="actions">
      <SfButton
        class="sf-button--full-width actions__button"
        @click="stepNavigate('next')"
        >{{ steps[currentStep] }}</SfButton
      >
      <SfButton
        class="sf-button--full-width sf-button--underlined actions__button smartphone-only"
        @click="stepNavigate('back')"
        >Go back</SfButton
      >
    </div>
  </div>
</template>
<script>
import { SfSteps, SfButton } from '@storefront-ui/vue';
import {
  PersonalDetails,
  Shipping,
  Payment,
  ConfirmOrder,
  OrderSummary,
  OrderReview
} from '@/components/checkout';
export default {
  name: 'Checkout',
  components: {
    SfSteps,
    PersonalDetails,
    Shipping,
    Payment,
    ConfirmOrder,
    OrderSummary,
    OrderReview,
    SfButton
  },
  middleware: 'getcart',
  data() {
    return {
      currentStep: 0,
      steps: [
        'Go to shipping',
        'Go to payment',
        'Pay for order',
        'Confirm and pay'
      ],
      buttonNames: [
        { name: 'Go to shipping' },
        { name: 'Go to payment' },
        { name: 'Review Order' },
        { name: 'Place my order' }
      ],
      characteristics: [
        {
          title: 'Safety',
          description: 'It carefully packaged with a personal touch',
          icon: 'safety'
        },
        {
          title: 'Easy shipping',
          description:
            'You’ll receive dispatch confirmation and an arrival date',
          icon: 'shipping'
        },
        {
          title: 'Changed your mind?',
          description: 'Rest assured, we offer free returns within 30 days',
          icon: 'return'
        }
      ]
    };
  },
  computed: {
    getOrder() {
      return {
        ...this.order,
        ...this.personalDetails,
        shipping: { ...this.shipping },
        payment: { ...this.payment }
      };
    }
  },
  mounted() {
    this.$store.dispatch('checkout/getCheckout');
  },
  methods: {
    updateStep(next) {
      if (next < this.currentStep) {
        this.currentStep = next;
      }
    },
    stepNavigate(action) {
      let isRunAction = false;
      switch (this.currentStep) {
        case 0:
          isRunAction = true;
          isRunAction = this.$refs.Personal.runAction();
          break;
        case 1: {
          isRunAction = this.$refs.Shipping.runAction();
          break;
        }
        case 2: {
          isRunAction = this.$refs.Payment.runAction();
          break;
        }
        case 3: {
          isRunAction = this.$refs.ConfirmOrder.runAction();
          break;
        }
      }
      if (isRunAction) {
        if (action === 'next') {
          if (this.currentStep !== 3) this.currentStep++;
        } else if (action === 'back') {
          if (this.currentStep !== 0) this.currentStep--;
        }
      } else {
        this.$toast.error('Please fill out missed fields');
      }
    }
  }
};
</script>
<style
  src="~/assets/sass/components/checkout/checkout.scss"
  lang="scss"
  scoped
></style>
