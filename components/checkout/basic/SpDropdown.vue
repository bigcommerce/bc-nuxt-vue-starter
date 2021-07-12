<template>
  <SfDropdown
    class="sf-dropdown--down"
    style="z-index: 100; position: relative; margin-bottom: 2rem"
    :is-open="isOpen"
    @click:open="
      () => {
        isOpen = true;
      }
    "
  >
    <template #opener>
      <SfButton
        class="sf-button--full-width sf-dropdown__opener"
        @click.stop="
          () => {
            isOpen = true;
          }
        "
        >Enter Your Address</SfButton
      >
    </template>
    <template #cancel><span></span></template>
    <SfList>
      <SfButton
        class="sf-button--full-width sf-button--underlined color-primary"
        @click.stop="handleSetAddress()"
      >
        Enter New Address
      </SfButton>
      <SfListItem v-for="(action, key) in consignments" :key="key">
        <SfButton
          class="sf-button--full-width sf-button--underlined color-primary"
          @click.stop="handleSetAddress(action)"
        >
          <div class="shipping">
            <p class="shipping__address">
              <span class="shipping__client-name">
                {{ action.shipping_address.first_name }}
                {{ action.shipping_address.last_name }}
              </span>
              <br />
              {{ action.shipping_address.street_1 }}
              {{ action.shipping_address.street_2 }}
              <br />
              {{ action.shipping_address.zip }}
              {{ action.shipping_address.city }},
              <br />
              {{ action.shipping_address.country }}
            </p>
            <p class="shipping__address">
              {{ action.shipping_address.phone }}
            </p>
          </div>
        </SfButton>
      </SfListItem>
    </SfList>
  </SfDropdown>
</template>

<script>
import { SfDropdown, SfList, SfButton } from '@storefront-ui/vue';
export default {
  name: 'SpDropdown',
  components: {
    SfDropdown,
    SfList,
    SfButton
  },
  props: {
    consignments: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    handleSetAddress(action = false) {
      this.isOpen = false;
      this.$emit('click:setAddress', action);
    }
  }
};
</script>

<style></style>
