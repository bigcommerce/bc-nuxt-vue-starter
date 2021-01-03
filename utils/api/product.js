export default ($axios) => ({
  /**
   * Get Product List from Store
   *
   * @param {string} query GraphQL Query
   */
  list: (query) => $axios.$post('/graphql', query),
  /**
   * Get Product Info by slug from Store
   *
   * @param {string} query GraphQL Query
   */
  bySlug: (query) => $axios.$post('/graphql', query)
});
