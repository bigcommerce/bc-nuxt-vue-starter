<template>
  <div id="category">
    <SfHeader
      title="BCVueNuxt"
    >
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
    <div class="navbar section">
      <div class="navbar__aside desktop-only">
        <h1 class="navbar__title">
          Shop All
        </h1>
      </div>
      <div class="navbar__main">
        <div class="navbar__counter">
          <span class="navbar__label desktop-only">Products found: </span>
          <strong class="desktop-only">{{ category.products.edges.length }}</strong>
          <span class="navbar__label mobile-only">{{ category.products.edges.length }}</span>
        </div>
      </div>
    </div>
    <div class="main section">
      <div class="products">
        <div class="products__list">
          <SfProductCard
            v-for="(product, i) in category.products.edges"
            :key="i"
            :title="product.node.name"
            :image="product.node.defaultImage.url"
            :link="'/products' + product.node.path"
            :regular-price="'$' + product.node.prices.price.value.toFixed(2)"
            class="products__product-card"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import '@storefront-ui/vue/styles.scss'
import {
  SfProductCard,
  SfHeader
} from '@storefront-ui/vue'
export default {
  components: {
    SfProductCard,
    SfHeader
  },
  async asyncData ({ params }) {
    const result = await axios({
      method: 'POST',
      url: 'https://kari-morars-store.mybigcommerce.com/graphql',
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJlYXQiOjIxMzM0NDM2NjEsInN1Yl90eXBlIjoyLCJ0b2tlbl90eXBlIjoxLCJjb3JzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJjaWQiOjEsImlhdCI6MTU4MjYxNTM2Mywic3ViIjoidGl5N3Fncm54NWIxbzAzcTRzcmJ2MXR6aXltNTlrZiIsInNpZCI6MTAwMDk5MDM1OSwiaXNzIjoiQkMifQ.GoN-AmBQXWGS_xA6GUaKI_OcxPH8mPIQLhbElBaH4gTBv4o1jb_xTKl3D1dwZZsSO8QKspPjlSE-ousLRnX2tA'
      },
      data: {
        query: `
          query CategoryByUrl {
            site {
              route(path: "/shop-all/") {
                node {
                  id
                  ... on Category {
                    name
                    entityId
                    products {
                      edges {
                        node {
                          name
                          path
                          defaultImage {
                            url(width: 216, height: 326)
                          }
                          prices {
                            price {
                              value
                              currencyCode
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `
      }
    })
    const productsData = result.data.data.site.route.node
    // debugger
    // console.log(productsData)

    return { category: productsData }
  },
  data () {
    return {
      category: {}
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}
.breadcrumbs {
  padding: $spacer-big $spacer-extra-big $spacer-extra-big;
}
.main {
  display: flex;
}
.navbar {
  position: relative;
  display: flex;
  @include for-desktop {
    border-top: 1px solid $c-light;
    border-bottom: 1px solid $c-light;
  }
  &::after {
    position: absolute;
    bottom: 0;
    left: $spacer-big;
    width: calc(100% - calc($spacer-big * 2));
    height: 1px;
    background-color: $c-light;
    content: "";
    @include for-desktop {
      content: none;
    }
  }
  &__aside {
    display: flex;
    align-items: center;
    flex: 0 0 15%;
    padding: $spacer-big $spacer-extra-big;
    border-right: 1px solid $c-light;
  }
  &__main {
    flex: 1;
    display: flex;
    align-items: center;
    padding: $spacer-medium 0;
    font-size: $font-size-small-mobile;
    @include for-desktop {
      padding: $spacer-big 0;
      font-size: $font-size-small-desktop;
    }
  }
  &__title {
    padding: 0;
    font-size: $font-size-big-mobile;
    line-height: 2.23;
    @include for-desktop {
      font-size: $font-size-big-desktop;
    }
  }
  &__filters-button {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    background: transparent;
    color: inherit;
    font-size: inherit;
    font-weight: 500;
    @include for-desktop {
      margin: 0 0 0 $spacer-extra-big;
      font-weight: 400;
      text-transform: none;
    }
    svg {
      fill: $c-dark;
      @include for-desktop {
        fill: $c-gray-variant;
      }
    }
    &:hover {
      color: $c-primary;
      svg {
        fill: $c-primary;
      }
    }
  }
  &__label {
    color: $c-gray-variant;
  }
  &__sort {
    display: flex;
    align-items: center;
    margin-left: $spacer-extra-big;
    margin-right: auto;
  }
  &__counter {
    margin: auto;
    @include for-desktop {
      margin-right: 0;
    }
  }
  &__view {
    display: flex;
    align-items: center;
    margin: 0 $spacer-extra-big;
    &-icon {
      margin-left: 10px;
    }
  }
}
.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0 - $spacer;
  @include for-desktop {
    margin: $spacer-big;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__product-card {
    flex: 0 0 50%;
    padding: $spacer;
    @include for-desktop {
      flex: 0 0 25%;
      padding: $spacer-big;
    }
  }
  &__pagination {
    @include for-desktop {
      display: flex;
      justify-content: center;
      margin-top: $spacer-extra-big;
    }
  }
}
.section {
  padding-left: $spacer-big;
  padding-right: $spacer-big;
  @include for-desktop {
    padding-left: 0;
    padding-right: 0;
  }
}
.sidebar {
  flex: 0 0 15%;
  padding: $spacer-extra-big;
  border-right: 1px solid $c-light;
}
.sort-by {
  flex: unset;
  width: 190px;
  padding: 0 10px;
  font-size: inherit;
  &__option {
    padding: 10px;
    font-size: inherit;
  }
}
.filters {
  padding: $spacer-big;
  &__title {
    margin: calc($spacer-big * 3) 0 $spacer-big;
    font-size: $font-size-big-mobile;
    line-height: 1.6;
    &:first-child {
      margin: 0 0 $spacer-big 0;
    }
    @include for-desktop {
      font-size: $font-size-big-desktop;
    }
  }
  &__item {
    padding: $spacer-small 0;
    &--color {
      margin: 0 $spacer;
    }
  }
  &__buttons {
    margin: calc($spacer-big * 3) 0 0 0;
  }
  &__button-clear {
    color: #a3a5ad;
    margin-top: 10px;
    background-color: $c-light;
  }
}
</style>
