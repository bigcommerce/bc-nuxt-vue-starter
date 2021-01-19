import axios from 'axios';
export const bigCommerceAxios = axios.create({
  baseURL: `${process.env.baseUrl}/graphql`,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    authorization: 'Bearer ' + process.env.storeFrontApiToken
  },
  withCredentials: true
});
