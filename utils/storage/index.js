import jwt from 'jsonwebtoken';

export const getCartId = () => window.localStorage.getItem('cartId');

export const getOrderId = () => window.localStorage.getItem('orderId');

export const setOrderId = (orderId) =>
  window.localStorage.setItem('orderId', orderId);

export const getSeo = () => {
  const seo = window.localStorage.getItem('big-nuxt-storefront-seo');
  if (typeof window !== 'undefined' && seo && seo !== 'null') {
    const data = jwt.verify(seo, process.env.jwtSecret);
    return data;
  }
  return null;
};

export const setSeo = (seo) =>
  window.localStorage.setItem(
    'big-nuxt-storefront-seo',
    jwt.sign(seo, process.env.jwtSecret)
  );
