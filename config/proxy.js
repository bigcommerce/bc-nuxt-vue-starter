export default {
  '/graphql': {
    target: process.env.BASE_URL,
    pathRewrite: { '^/graphql': '/graphql' }
  },
  '/api': {
    target: process.env.BC_API_URL,
    pathRewrite: { '^/api': '' }
  }
};
