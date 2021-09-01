export default {
  dsn: process.env.SENTRY_DSN, // Enter your project's DSN here
  // Additional Module Options go here
  // https://sentry.nuxtjs.org/sentry/options
  config: {
    // Add native Sentry config here
    // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
    debug: true
  }
};
