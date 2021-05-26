export const getCartId = () => window.localStorage.getItem('cartId');

export const getOrderId = () => window.localStorage.getItem('orderId');

export const setOrderId = (orderId) =>
  window.localStorage.setItem('orderId', orderId);
