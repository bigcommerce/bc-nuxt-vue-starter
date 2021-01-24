<template>
  <div id="loader" :style="style">
    <SfLoader :loading="loading" />
  </div>
</template>

<script>
import { SfLoader } from '@storefront-ui/vue';
export default {
  name: 'Loader',
  components: {
    SfLoader
  },
  props: {
    loading: Boolean
  },
  computed: {
    style() {
      if (!this.loading) {
        return { display: 'none' };
      }
      return null;
    }
  }
};
</script>

<style lang="scss" src="~/assets/sass/components/loader.scss" scoped></style>
