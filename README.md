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

# deploy static project on vercel
Before running bellow script, you should put the vercel ENV from the local env.
$ npm run deploy

# deploy non-static project on heroku
Firstly, please create free heroku account.
1. Please follow up below commands.
    brew install heroku/brew/heroku
    heroku login
    heroku create {Heroku App Name} - i.e: heroku create bc-vue-nuxt-starter
    npm run set-heroku-env
2. Please make you are on the latest updates of your current branch codebase.
3. After checking of these, please change something.
  - Change "target: 'static'" to "target: 'server'" in nuxt.config.js
  - Remove .env from .gitignore.
4. Run commands
    git add .
    git commit -am "commit message"
    git push heroku master


# deploy static project on netlify
Important thing is to push .env file to git if you are going to publish from github repo. For security person, we recommend you to use your private repo.
1. Set all environments from your local to netlify environment setting
2. Run these commands on local. `netlify login`, `netlify dev` if you want to run this application on netlify environment, please add local netlify function url to netlify env.
3. `git push`, then netlify server will automatically build your applicatoin.
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

## How to use sample translation JSON file

```
{
  "es": [
    {
      "[Sample] 1 L Le Parfait Jar": "[Muestra] Tarro Le Parfait de 1 litro",
      "Color": "Color",
      "Orange": "Naranja",
      "Size": "Tamaño",
      "Medium": "Medio",
      "Weight": "Peso",
      "5Kg": "5Kg",
      "Modifier": "Modificador",
      "test2": "test2"
    }
  ],
  "en": [
    {
      "[Sample] 1 L Le Parfait Jar": "[Sample] 1 L Le Parfait Jar",
      "Color": "Color",
      "Orange": "Orange",
      "Size": "Size",
      "Medium": "Medium",
      "Weight": "Weight",
      "5Kg": "5Kg",
      "Modifier": "Modifier",
      "test2": "test2"
    }
  ]
}
If you want to write sample translation for cart name and cart configuration, you should add translations of carts as arrays.
```

## How to set up checkout type

```
There are 3 types of checkout type - `redirected`, `custom`, `embedded`.
If you set CHECKOUT_TYPE in env with these variables, it will be worked.
"redirected" - redirect to default checkout page provided in cart reidrect_urls.
"custom" - go to customized checkout page.
"embedded" - load default checkout page into our storefront checkout page as iframe. This wouldn't work on HTTP localhost. Firstly, you should use SSL for this using ngrok or any other thing. And you should input the https URL into channel site URL.
```

If you're new to BigCommerce, that's ok! You can create a free developer sandbox store here: https://developer.bigcommerce.com/sandbox/vue

## Props

Divante's awesome open sourced Storefront UI project made it possible to quickly make this look and feel like a real e-comm site using Vue + Nuxt. Check it out here: http://storefrontui.com/
