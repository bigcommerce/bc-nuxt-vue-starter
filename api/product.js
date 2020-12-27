export default ($axios) => ({
  list(query) {
    return $axios.$post('', query);
  }
});
