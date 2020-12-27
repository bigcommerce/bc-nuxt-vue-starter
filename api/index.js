import Product from './product';
export const getApi = ($axios) => ({
  product: Product($axios)
});
