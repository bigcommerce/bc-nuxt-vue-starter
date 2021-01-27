import jwt from 'jsonwebtoken';
const { v4: uuidv4 } = require('uuid');

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
  return user;
};
export const getUser = () => {
  const user = window.localStorage.getItem('bigcommerceCustomer');
  if (typeof window !== 'undefined' && user && user !== 'null') {
    return JSON.parse(user);
  }
  return null;
};

export const getSecuredData = (secureData) => {
  const data = jwt.verify(secureData, process.env.jwtSecret);
  return data;
};

export const removeUserAndCookie = () => {
  window.localStorage.removeItem('bigcommerceCustomer');
};

export const getCartCheckoutRedirectUrl = (url) => {
  const user = getUser();
  if (!user || typeof user?.secureData === 'undefined') {
    return url;
  } else {
    const loggedInCustomerData = getSecuredData(user.secureData);
    const dateCreated = Math.round(new Date().getTime() / 1000);
    const payload = {
      iss: process.env.apiClientId,
      iat: dateCreated,
      jti: uuidv4(),
      operation: 'customer_login',
      store_hash: process.env.storeHash,
      customer_id: loggedInCustomerData.id,
      // The redirect param is base64 encoded to simplify transfering the url within a GET request,
      // so we need to convert it back into a string here
      redirect_to: Buffer.from(btoa(url), 'base64').toString()
    };

    // The JWT token must be signed by the BC API Secret
    const token = jwt.sign(payload, process.env.apiSecret, {
      algorithm: 'HS256'
    });
    const loginUrl = `${process.env.baseUrl}/login/token/${token}`;
    return loginUrl;
  }
};
