<template>
  <SfHeader
    :style="{ 'margin-bottom': '20px' }"
    title="BCVueNuxt"
    class="sf-header--has-mobile-navigation sf-header--has-mobile-search"
    :cart-icon="false"
    :account-icon="false"
    :wishlist-icon="false"
  >
    <template #navigation>
      <SfHeaderNavigationItem
        v-for="item in menu"
        :key="item.link"
        :label="item.name"
        :link="item.link"
        @click="handleClick"
      />
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader } from '@storefront-ui/vue';
import { menu } from '~/constants';
export default {
  name: 'Home',
  components: {
    SfHeader
  },
  props: {
    menu: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    handleClick(e) {
      const menuItem = e.target.getAttribute('data-testid');
      if (menuItem) {
        const route = menu.find((item) => item.name === menuItem).link;
        this.$router.push(route);
      }
    }
  }
};
</script>
