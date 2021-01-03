export default ($axios) => ({
  /**
   * Get Product List from Store
   *
   * @param {string} query GraphQL Query
   */
  list: (query) => $axios.$post('/graphql', query),
  byId: (query) => $axios.$post('/graphql', query)
});
