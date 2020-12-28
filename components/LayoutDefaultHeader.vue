<template>
  <SfHeader title="BCVueNuxt">
    <template #navigation>
      <SfHeaderNavigationItem>
        <a
          href="/"
          :style="{ display: 'flex', alignItems: 'center', height: '100%' }"
        >
          Home
        </a>
      </SfHeaderNavigationItem>
      <SfHeaderNavigationItem>
        <a
          href="/products"
          :style="{ display: 'flex', alignItems: 'center', height: '100%' }"
        >
          Shop All
        </a>
      </SfHeaderNavigationItem>
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader, Sf } from '@storefront-ui/vue';
export default {
  name: 'Home',
  components: {
    SfHeader,
    SfLink
  }
};
</script>
