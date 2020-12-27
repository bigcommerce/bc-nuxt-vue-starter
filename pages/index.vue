<template>
  <div id="home">
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
    <SfHero class="section">
      <SfHeroItem
        v-for="(hero, i) in heroes"
        :key="i"
        :title="hero.title"
        :subtitle="hero.subtitle"
        :button-text="hero.buttonText"
        :background="hero.background"
        :image="hero.image"
        :class="hero.className"
      />
    </SfHero>
    <SfBannerGrid :banner-grid="1" class="banners section">
      <template #bannerA>
        <a href="/products">
          <SfBanner
            subtitle="Dresses"
            title="COCKTAIL PARTY"
            description="Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands."
            button-text="SHOP NOW"
            :image="{
              mobile: '/assets/storybook/Home/bannerB.jpg',
              desktop: '/assets/storybook/Home/bannerF.jpg'
            }"
            class="sf-banner--slim banner-custom"
          />
        </a>
      </template>
      <template #bannerB>
        <a href="/products">
          <SfBanner
            subtitle="Dresses"
            title="LINEN DRESSES"
            description="Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands."
            button-text="SHOP NOW"
            image="/assets/storybook/Home/bannerE.jpg"
            class="sf-banner--slim banner-central"
          />
        </a>
      </template>
      <template #bannerC>
        <a href="/products">
          <SfBanner
            subtitle="T-Shirts"
            title="THE OFFICE LIFE"
            image="/assets/storybook/Home/bannerC.jpg"
            class="sf-banner--slim"
          />
        </a>
      </template>
      <template #bannerD>
        <a href="/products">
          <SfBanner
            subtitle="Summer shoes"
            title="ECO SANDALS"
            image="/assets/storybook/Home/bannerG.jpg"
            class="sf-banner--slim"
          />
        </a>
      </template>
    </SfBannerGrid>
    <SfCallToAction
      title="Subscribe to Newsletters"
      button-text="Subscribe"
      description="Be aware of upcoming sales and events. Receive gifts and special offers!"
      class="call-to-action-newsletter"
      image="assets/storybook/Home/newsletter.jpg"
    />
    <SfSection title-heading="Best Sellers" class="section">
      <SfCarousel class="product-carousel">
        <SfCarouselItem v-for="(product, i) in products" :key="i">
          <SfProductCard
            :title="product.title"
            :image="product.image"
            :regular-price="product.price.regular"
            :max-rating="product.rating.max"
            :score-rating="product.rating.score"
            :is-on-wishlist="product.isOnWishlist"
            class="product-card"
            @click:wishlist="toggleWishlist(i)"
          />
        </SfCarouselItem>
      </SfCarousel>
    </SfSection>
    <SfSection
      title-heading="Share Your Look"
      subtitle-heading="#YOURLOOK"
      class="section"
    >
      <div class="images-grid">
        <div class="images-grid__row">
          <div class="images-grid__col">
            <SfImage
              src="assets/storybook/Home/imageA.jpg"
              :width="486"
              :height="486"
            >
              katherina_trn
            </SfImage>
          </div>
          <div class="images-grid__col">
            <SfImage
              src="assets/storybook/Home/imageB.jpg"
              :width="486"
              :height="486"
            >
              katherina_trn
            </SfImage>
          </div>
        </div>
        <div class="images-grid__row">
          <div class="images-grid__col">
            <SfImage
              src="assets/storybook/Home/imageC.jpg"
              :width="486"
              :height="486"
            >
              katherina_trn
            </SfImage>
          </div>
          <div class="images-grid__col">
            <SfImage
              src="assets/storybook/Home/imageD.jpg"
              :width="486"
              :height="486"
            >
              katherina_trn
            </SfImage>
          </div>
        </div>
      </div>
    </SfSection>
    <SfBanner
      image="/assets/storybook/Home/bannerD.png"
      class="banner-application desktop-only"
    >
      <template #subtitle>
        <div class="banner-application__subtitle">
          Fashion to Take Away
        </div>
      </template>
      <template #title>
        <h1 class="banner-application__title">
          Download our application to your&nbsp;mobile
        </h1>
      </template>
      <template #call-to-action>
        <div>
          <img
            class="banner-application__download"
            src="assets/storybook/Home/google.png"
            alt=""
          />
          <img
            class="banner-application__download"
            src="assets/storybook/Home/apple.png"
            alt=""
          />
        </div>
      </template>
    </SfBanner>
  </div>
</template>
<script>
import {
  SfHeader,
  SfHero,
  SfBanner,
  SfCallToAction,
  SfSection,
  SfCarousel,
  SfProductCard,
  SfImage,
  SfBannerGrid
} from '@storefront-ui/vue';
export default {
  name: 'Home',
  components: {
    SfHeader,
    SfHero,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfBannerGrid
  },
  data() {
    return {
      heroes: [
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2019',
          buttonText: 'Learn more',
          background: '#eceff1',
          image: 'assets/storybook/Home/bannerH.jpg'
        },
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2019',
          buttonText: 'Learn more',
          background: '#efebe9',
          image: 'assets/storybook/Home/bannerHM.jpg',
          className:
            'sf-hero-item--position-bg-top-left sf-hero-item--align-right'
        },
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2019',
          buttonText: 'Learn more',
          background: '#fce4ec',
          image: 'assets/storybook/Home/bannerH.jpg'
        }
      ],
      products: [
        {
          title: 'Cream Beach Bag',
          image: 'assets/storybook/Home/productA.jpg',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: true
        },
        {
          title: 'Cream Beach Bag',
          image: 'assets/storybook/Home/productB.jpg',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: 'assets/storybook/Home/productC.jpg',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: 'assets/storybook/Home/productA.jpg',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: 'assets/storybook/Home/productB.jpg',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: 'assets/storybook/Home/productC.jpg',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: 'assets/storybook/Home/productA.jpg',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: 'assets/storybook/Home/productB.jpg',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        }
      ]
    };
  },
  methods: {
    toggleWishlist(index) {
      this.products[index].isOnWishlist = !this.products[index].isOnWishlist;
    }
  }
};
</script>
<style src="~/assets/sass/pages/home.scss" lang="scss" scoped></style>
