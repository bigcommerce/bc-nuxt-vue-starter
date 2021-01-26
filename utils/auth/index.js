import jwt from 'jsonwebtoken';
import axios from 'axios';
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

export const getUser = () =>
  typeof window !== 'undefined' &&
  window.localStorage.getItem('bigcommerceCustomer')
    ? JSON.parse(window.localStorage.getItem('bigcommerceCustomer'))
    : null;

export const removeUserAndCookie = () => {
  window.document.cookie = 'SHOP_TOKEN=null';
  window.localStorage.removeItem('bigcommerceCustomer');
};

export const getCartCheckoutRedirectUrl = (response) => {
  const user = getUser();
  if (!user || typeof user?.secureData === 'undefined') {
    return response.data.checkout_url;
  } else {
    const loggedInCustomerData = jwt.verify(
      user.secureData,
      process.env.jwtSecret
    );
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
      redirect_to: Buffer.from(
        btoa(response.data.checkout_url),
        'base64'
      ).toString()
    };

    // The JWT token must be signed by the BC API Secret
    const token = jwt.sign(payload, process.env.apiSecret, {
      algorithm: 'HS256'
    });
    const loginUrl = `${process.env.baseUrl}/login/token/${token}`;
    return loginUrl;
  }
};

export const customerApi = axios.create({
  baseURL: `${process.env.baseUrl}/graphql`,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    authorization: 'Bearer ' + process.env.storeFrontApiToken
  },
  withCredentials: true
});
