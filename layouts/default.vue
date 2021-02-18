<template>
  <client-only>
    <div>
      <LayoutDefaultHeader :menu="menu" />
      <nuxt />
    </div>
  </client-only>
</template>

<script>
import { menu } from '@/constants';
import LayoutDefaultHeader from '@/components/LayoutDefaultHeader';
export default {
  components: {
    LayoutDefaultHeader
  },
  data() {
    return {
      menu
    };
  }
};
</script>
<style src="~/assets/sass/layouts/default.scss" lang="scss"></style>
