const ACCESSIBLE_API_ENDPOINTS = [
  'GET_shopAll',
  'GET_getProductBySlug',
  'GET_getCart',
  'POST_createCart',
  'POST_addCartItem',
  'PUT_updateCartItem',
  'DELETE_deleteCartItem',
  'GET_getAllOrders',
  'GET_getAllAddresses',
  'PUT_updateAddress',
  'POST_addAddress',
  'DELETE_deleteAddress'
];

export const checkApiAccessPermission = (permission) => {
  if (ACCESSIBLE_API_ENDPOINTS.includes(permission)) {
    return true;
  } else {
    return false;
  }
};
