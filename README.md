# bc-nuxt-vue-starter

> BigCommerce + Nuxt + Storefront UI Starter

## Build Setup

````bash
# install dependencies
$ npm install

# ENV
- Create .env file from .env.example.
- Input your Store URL and Storefront API Token

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
````

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Requirements

You'll need a BigCommerce store and a token for our GraphQL Storefront API, which you can create in the API Account section of the control panel. Once you have your BC API credentials, here's a sample request to create a token:

````json
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/storefront/api-token
{
  "channel_id": 1,
  "expires_at": 2133443661,
  "allowed_cors_origins": ["http://localhost:3000"]
}
````

If you're new to BigCommerce, that's ok! You can create a free developer sandbox store here: https://developer.bigcommerce.com/sandbox/vue

## Props

Divante's awesome open sourced Storefront UI project made it possible to quickly make this look and feel like a real e-comm site using Vue + Nuxt. Check it out here: http://storefrontui.com/
