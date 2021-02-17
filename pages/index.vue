<template>
  <div id="home">
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
    <SfBannerGrid class="banners" :banner-grid="bannerGrid">
      <template v-for="item in banners" #[item.slot]>
        <SfBanner
          :key="item.slot"
          :title="item.title"
          :subtitle="item.subtitle"
          :description="item.description"
          :button-text="item.buttonText"
          :image="item.image"
          :class="item.class"
        />
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
        <SfImage
          class="images-grid__col"
          src="assets/storybook/Home/imageA.jpg"
          alt="imageA"
        >
          katherina_trn
        </SfImage>
        <SfImage
          class="images-grid__col"
          src="assets/storybook/Home/imageB.jpg"
          alt="imageB"
        >
          katherina_trn
        </SfImage>
        <SfImage
          class="images-grid__col"
          src="assets/storybook/Home/imageC.jpg"
          alt="imageC"
        >
          katherina_trn
        </SfImage>
        <SfImage
          class="images-grid__col"
          src="assets/storybook/Home/imageD.jpg"
          alt="imageD"
        >
          katherina_trn
        </SfImage>
      </div>
    </SfSection>
    <SfBanner
      image="/assets/storybook/Home/bannerD.png"
      class="banner-application desktop-only"
    >
      <template #subtitle>
        <div class="banner-application__subtitle">Fashion to Take Away</div>
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
            alt="google"
          />
          <img
            class="banner-application__download"
            src="assets/storybook/Home/apple.png"
            alt="apple"
          />
        </div>
      </template>
    </SfBanner>
  </div>
</template>
<script>
import {
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
    SfHero,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfBannerGrid
  },
  layout: 'Default',
  data() {
    return {
      heroes: [
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2019',
          buttonText: 'Learn more',
          background: '#eceff1',
          image: '/assets/storybook/Home/bannerH.jpg'
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
          image: '/assets/storybook/Home/bannerH.jpg'
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
      ],
      banners: [
        {
          slot: 'banner-A',
          subtitle: 'Dresses',
          title: 'Cocktail & Party',
          description:
            "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.",
          buttonText: 'Shop now',
          image: '/assets/storybook/Home/bannerF.jpg',
          class: 'sf-banner--slim'
        },
        {
          slot: 'banner-B',
          subtitle: 'Dresses',
          title: 'Linen Dresses',
          description:
            "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.",
          buttonText: 'Shop now',
          image: '/assets/storybook/Home/bannerE.jpg',
          class: 'sf-banner--slim',
          style: 'padding-right: 20%'
        },
        {
          slot: 'banner-C',
          subtitle: 'T-Shirts',
          title: 'The Office Life',
          buttonText: 'Shop now',
          image: '/assets/storybook/Home/bannerJ.jpg',
          class: 'sf-banner--slim'
        },
        {
          slot: 'banner-D',
          subtitle: 'Summer Sandals',
          title: 'Eco Sandals',
          buttonText: 'Shop now',
          image: '/assets/storybook/Home/bannerG.jpg',
          class: 'sf-banner--slim'
        }
      ],
      bannerGrid: 1
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
