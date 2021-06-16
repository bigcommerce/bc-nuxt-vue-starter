# bc-nuxt-vue-starter

> BigCommerce + Nuxt + Storefront UI Starter

## Build Setup

```bash
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

#deploy static project
Before running bellow script, you should put the vercel ENV from the local env.
$ npm run deploy
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Requirements

You will need a channel.

```json
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/channels
{
  "is_listable_from_ui": false,
  "is_visible": true,
  "name": {channel_name},
  "status": "active",
  "type": "storefront",
  "platform": "custom",
  "config_meta": {
    "app": {
      "id": {app id},
      "sections": [{ "title": {title}, "query_path": {query path} }]
    }
  }
}

Or you can just run a CLI.
$ npm run create-storefront-channel --name {channel name} --appId {app id} --sections {sections}
i.e -> npm run create-storefront-channel --name "channel name" --appId 4949 --sections '[{"title":"Overview", "query_path":"overview"}]'
Data type should be matched like above
```

You'll need a BigCommerce store and a token for our GraphQL Storefront API, which you can create in the API Account section of the control panel. Once you have your BC API credentials, here's a sample request to create a token:

```json
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/storefront/api-token
{
  "channel_id": 1,
  "expires_at": 2133443661,
  "allowed_cors_origins": ["http://localhost:3000"]
}

Or you can just run a CLI.
$ npm run create-storefront-token --channelId {channel id} --hostUrl {host url}
channel_id - you will get this id from above command.
i.e -> npm run create-storefront-token --channelId 123455 --hostUrl http://localhost:3000

(*) If you need to deploy on vercel, you should set the origin as the initially deployed URL and create this token.
```

You will need a site.

```json
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/channels/{{channelId}}/site
{
  "channel_id": 123456,
  "url": "http://store.example.com"
}

Or you can just run a CLI.
$ npm run create-storefront-site --channelId {channel id} --siteUrl {site url}
i.e -> npm run create-storefront-site --channelId 123456 --siteUrl "http://store.example.com"
```

You will need a route.

```json
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/sites/{{siteId}}/routes
{
  "type": "product",
  "route": "/product/book",
  "matching": "*"
}

Or you can just run a CLI.
$ npm run create-storefront-route --siteId {site id} --type {type} --route {route}
i.e -> npm run create-storefront-route --siteId 1001 --type "product" --route "/product/book"
If you don't input these params, default routes will be added.
[
  {
    "type": "cart",
    "matching": "*",
    "route": "/cart"
  },
  {
    "type": "product",
    "matching": "*",
    "route": "/products/{slug}"
  },
  {
    "type": "category",
    "matching": "*",
    "route": "/{slug}"
  },
  {
    "type": "home",
    "matching": "*",
    "route": "/"
  },
  {
    "type": "account_order_status",
    "matching": "*",
    "route": "/login?action=view_order_status"
  },
  {
    "type": "create_account",
    "matching": "*",
    "route": "/register"
  },
  {
    "type": "login",
    "matching": "*",
    "route": "/login"
  }
]
```

If you're new to BigCommerce, that's ok! You can create a free developer sandbox store here: https://developer.bigcommerce.com/sandbox/vue

## Props

Divante's awesome open sourced Storefront UI project made it possible to quickly make this look and feel like a real e-comm site using Vue + Nuxt. Check it out here: http://storefrontui.com/
