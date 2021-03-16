import axios from 'axios';

export const customAxios = (action) => {
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
    headers.authorization = `Bearer ${process.env.STOREFRONT_API_TOKEN}`;
  }
  return axios.create({
    baseURL,
    headers,
    withCredentials: true
  });
};
