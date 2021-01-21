import jwt from 'jsonwebtoken';

export const setUser = (user) => {
  if (user) {
    const secureData = jwt.sign(
      {
        id: user.id,
        groupId: user.groupId
      },
      process.env.jwtSecret
    );
    user = {
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      secureData
    };
  }
  window.localStorage.setItem('bigcommerceCustomer', JSON.stringify(user));
};

export const getUser = () =>
  typeof window !== 'undefined' &&
  window.localStorage.getItem('bigcommerceCustomer')
    ? JSON.parse(window.localStorage.getItem('bigcommerceCustomer'))
    : null;

export const removeUserAndCookie = () => {
  // window.document.cookie = null;
  window.localStorage.removeItem('bigcommerceCustomer');
};
