import Product from './product';

/**
 * APIs
 *
 * @param {*} $axios
 */
export const getApi = ($axios) => ({
  product: Product($axios)
});
