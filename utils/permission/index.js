const ACCESSIBLE_API_ENDPOINTS = [
  'GET_getCategories',
  'GET_getProductsByCategory',
  'GET_getProductBySlug',
  'GET_getCart',
  'POST_createCart',
  'POST_addCartItem',
  'PUT_updateCartItem',
  'PUT_updateCartWithCustomerId',
  'DELETE_deleteCartItem',
  'GET_getAllOrders',
  'GET_getAllAddresses',
  'PUT_updateAddress',
  'POST_addAddress',
  'DELETE_deleteAddress',
  'GET_searchProductByKey',
  'POST_customerLogin',
  'POST_customerRegister',
  'GET_getCheckout',
  'POST_setConsignmentToCheckout',
  'PUT_updateConsignmentToCheckout',
  'PUT_updateShippingOption',
  'POST_setBillingAddressToCheckout',
  'POST_createOrder',
  'GET_getPaymentMethodByOrder',
  'POST_processPayment',
  'POST_addCoupons',
  'GET_getProductOption'
];

export const checkApiAccessPermission = (permission) => {
  if (ACCESSIBLE_API_ENDPOINTS.includes(permission)) {
    return true;
  } else {
    return false;
  }
};
