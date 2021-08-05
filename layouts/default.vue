<template>
  <client-only>
    <div>
      <LayoutDefaultHeader :menu="menu" />
      <nuxt keep-alive :keep-alive-props="{ max: 10 }" />
    </div>
  </client-only>
</template>

<script>
import { menu } from '@/constants';
import { mapGetters } from 'vuex';
import LayoutDefaultHeader from '@/components/LayoutDefaultHeader';
export default {
  components: {
    LayoutDefaultHeader
  },
  middleware: 'authenticated',
  data() {
    return {
      menu
    };
  },
  head() {
    return {
      title: this.seo.page_title || process.env.npm_package_name || '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.seo.meta_description || ''
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.seo.meta_keywords || ''
        }
      ]
    };
  },
  computed: {
    ...mapGetters('storefront', ['seo'])
  },
  mounted() {
    this.$store.dispatch('storefront/getStorefrontSeo');
  }
};
</script>
<style src="~/assets/sass/layouts/default.scss" lang="scss"></style>
