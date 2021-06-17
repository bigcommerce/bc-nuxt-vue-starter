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
import LayoutDefaultHeader from '@/components/LayoutDefaultHeader';
export default {
  components: {
    LayoutDefaultHeader
  },
  middleware: 'authenticated',
  data() {
    return {
      menu,
      seo: {}
    };
  },
  async fetch() {
    this.seo = await this.$store.dispatch('storefront/getStorefrontSeo');
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
  }
};
</script>
<style src="~/assets/sass/layouts/default.scss" lang="scss"></style>
