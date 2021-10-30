import jwt from 'jsonwebtoken';

// Cart
export const setCartId = (cartId) =>
  window.localStorage.setItem('cartId', cartId);
export const getCartId = () => window.localStorage.getItem('cartId');
export const removeCartId = () => window.localStorage.removeItem('cartId');

// Order
export const setOrderId = (orderId) =>
  window.localStorage.setItem('orderId', orderId);
export const getOrderId = () => window.localStorage.getItem('orderId');

// Seo
export const setSeo = (seo) =>
  window.localStorage.setItem(
    'big-nuxt-storefront-seo',
    jwt.sign(seo, process.env.jwtSecret)
  );
export const getSeo = () => {
  const seo = window.localStorage.getItem('big-nuxt-storefront-seo');
  if (typeof window !== 'undefined' && seo && seo !== 'null') {
    const data = jwt.verify(seo, process.env.jwtSecret);
    return data;
  }
  return null;
};

// Customer
export const setCustomer = (user) =>
  window.localStorage.setItem('bigcommerceCustomer', JSON.stringify(user));
export const getCustomer = () =>
  window.localStorage.getItem('bigcommerceCustomer');

// Cookie
export const setCookie = (cookie) =>
  window.localStorage.setItem('cookie', cookie);
export const getCookie = () => window.localStorage.getItem('cookie');

// Remove Customer and Cookie
export const removeUserAndCookie = () => {
  window.localStorage.removeItem('bigcommerceCustomer');
  window.localStorage.removeItem('cookie');
};

// Wishlist
export const setWishlistId = (wishlistId) =>
  window.localStorage.setItem('wishlistId', wishlistId);
export const getWishlistId = () => window.localStorage.getItem('wishlistId');
export const removeWishlistId = () =>
  window.localStorage.removeItem('wishlistId');
