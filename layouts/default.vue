<template>
  <client-only>
    <div>
      <LayoutDefaultHeader :menu="menu" />
      <nuxt keep-alive :keep-alive-props="{ max: 10 }" />
      <SfFooter>
        <SfFooterColumn
          v-for="(column, key) in footerColumns"
          :key="key"
          :title="column.title"
        >
          <SfList>
            <SfListItem v-for="(menuItem, index) in column.items" :key="index">
              <SfMenuItem :label="menuItem" />
            </SfListItem>
          </SfList>
        </SfFooterColumn>
      </SfFooter>
    </div>
  </client-only>
</template>

<script>
import { mapGetters } from 'vuex';
import { SfFooter, SfList, SfMenuItem } from '@storefront-ui/vue';
import { menu } from '@/constants';
import LayoutDefaultHeader from '@/components/LayoutDefaultHeader';
export default {
  components: {
    LayoutDefaultHeader,
    SfFooter,
    SfList,
    SfMenuItem
  },
  middleware: 'authenticated',
  data() {
    return {
      menu,
      footerColumns: [
        {
          title: 'About us',
          items: ['Who we are']
        },
        {
          title: 'Departments',
          items: ['Home']
        },
        {
          title: 'Help',
          items: ['Contact us']
        },
        {
          title: 'Payment & delivery',
          items: ['Purchase terms']
        }
      ]
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
