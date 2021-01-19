export const setUser = (user) => {
  window.localStorage.setItem('bigcommerceCustomer', user);
};

export const getUser = () =>
  typeof window !== 'undefined' &&
  window.localStorage.getItem('bigcommerceCustomer')
    ? JSON.parse(window.localStorage.getItem('bigcommerceCustomer'))
    : null;

export const removeUserAndCookie = () => {
  window.document.cookie = null;
  window.localStorage.removeItem('bigcommerceCustomer');
};
