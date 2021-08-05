const axios = require('axios');

module.exports.customAxios = (action, cookie = null, auth = null) => {
  let baseURL = '';
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
  if (action === 'api') {
    baseURL = process.env.BC_API_URL;
    headers['X-Auth-Token'] = `${process.env.API_TOKEN}`;
  } else if (action === 'graphql') {
    baseURL = process.env.BASE_URL;
    headers.Authorization = `Bearer ${process.env.STOREFRONT_API_TOKEN}`;
  } else if (action === 'payment') {
    baseURL = process.env.PAYMENT_URL;
    headers.Accept = 'application/vnd.bc.v1+json';
    headers.Authorization = `PAT ${auth}`;
  }
  if (cookie) {
    headers.Cookie = cookie;
  }
  return axios.create({
    baseURL,
    headers,
    withCredentials: true
  });
};
