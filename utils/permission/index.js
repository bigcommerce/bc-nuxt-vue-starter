const ACCESSIBLE_API_ENDPOINTS = [
  'POST_carts',
  'PUT_carts',
  'GET_carts',
  'POST_carts/items',
  'GET_carts/items',
  'PUT_carts/items',
  'DELETE_carts/items',
  'POST_pricing/products'
];

export const checkApiAccessPermission = (url, method) => {
  let prefix = '';
  if (url.includes('carts')) {
    prefix = 'carts';
    if (url.includes('items')) prefix = 'carts/items';
  } else if (url.includes('pricing') && url.includes('products')) {
    prefix = 'pricing/products';
  }
  const queryString = `${method.toUpperCase()}_${prefix}`;
  if (ACCESSIBLE_API_ENDPOINTS.includes(queryString)) return null;
  const error = {
    response: {
      status: 403
    }
  };
  return error;
};
