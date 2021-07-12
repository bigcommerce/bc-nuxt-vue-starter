<template>
  <div id="error">
    <SfImage
      class="image"
      :src="require('@storefront-ui/shared/icons/error.svg')"
      alt="Storefront is down"
    />
    <SfHeading
      title="Storefront is down"
      :level="2"
      description="We are sorry that this storefront is down, please go back or try again"
      class="heading sf-heading--no-underline"
    />
    <div class="actions">
      <SfButton link="/" class="sf-button--full-width actions__button">
        Return home
      </SfButton>
    </div>
  </div>
</template>
<script>
import { SfButton, SfImage, SfHeading } from '@storefront-ui/vue';
export default {
  name: 'Error',
  components: { SfButton, SfImage, SfHeading },
  layout: 'errorhoc'
};
</script>
<style src="~/assets/sass/pages/error.scss" lang="scss"></style>
