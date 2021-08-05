export default {
  '/graphql': {
    target: process.env.BASE_URL || 'http"//localhost:3000',
    pathRewrite: { '^/graphql': '/graphql' }
  },
  '/api': {
    target: process.env.BC_API_URL || 'http"//localhost:3000',
    pathRewrite: { '^/api': '' }
  }
};
