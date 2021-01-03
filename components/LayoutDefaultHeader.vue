<template>
  <SfHeader title="BCVueNuxt" @click:cart="handleClickCart">
    <template #navigation>
      <SfHeaderNavigationItem v-for="item in menu" :key="item.link">
        <template slot="desktop-navigation-item">
          <SfLink
            :link="item.link"
            :style="{
              outline: 'none',
              display: 'inline-block',
              'white-space': 'nowrap'
            }"
          >
            {{ item.name }}
          </SfLink>
        </template>
      </SfHeaderNavigationItem>
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader, SfLink } from '@storefront-ui/vue';
export default {
  name: 'Home',
  components: {
    SfHeader,
    SfLink
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
    handleClickCart() {
      this.$router.push({ name: 'cart' });
    }
  }
};
</script>
