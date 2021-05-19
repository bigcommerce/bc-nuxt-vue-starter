export const cartId = window.localStorage.getItem('cartId');

export const orderId = window.localStorage.getItem('orderId');

export const setOrderId = (orderId) =>
  window.localStorage.setItem('orderId', orderId);
