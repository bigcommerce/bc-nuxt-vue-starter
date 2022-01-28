export default {
  title: process.env.npm_package_name || '',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: process.env.npm_package_description || ''
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com/',
      crossorigin: 'anonymous'
    }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    {
      rel: 'preload',
      as: 'style',
      href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
      crossorigin: 'anonymous'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
      media: 'print',
      onload: "this.media='all'"
    }
  ]
};
