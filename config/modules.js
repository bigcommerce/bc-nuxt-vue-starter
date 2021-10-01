const modules = [
  '@nuxtjs/dotenv',
  '@nuxtjs/axios',
  '@nuxtjs/pwa',
  '@nuxtjs/toast',
  '@nuxtjs/proxy'
];
if (process.env.NODE_ENV === 'production') modules.push('@nuxtjs/sentry');
export default modules;
