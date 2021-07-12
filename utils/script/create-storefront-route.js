const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const defaultRoutes = [
  {
    type: 'cart',
    matching: '*',
    route: '/cart'
  },
  {
    type: 'product',
    matching: '*',
    route: '/products/{slug}'
  },
  {
    type: 'category',
    matching: '*',
    route: '/{slug}'
  },
  {
    type: 'home',
    matching: '*',
    route: '/'
  },
  {
    type: 'account_order_status',
    matching: '*',
    route: '/login?action=view_order_status'
  },
  {
    type: 'create_account',
    matching: '*',
    route: '/register'
  },
  {
    type: 'login',
    matching: '*',
    route: '/login'
  }
];

const createRouteCall = async (siteId, route) => {
  return await axios.post(
    `${process.env.BC_API_URL}/stores/${process.env.STORE_HASH}/v3/sites/${siteId}/routes`,
    {
      ...route
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': process.env.API_TOKEN
      }
    }
  );
};

module.exports.createRoute = async function (siteId, type, route) {
  try {
    if (type && route) {
      const response = await createRouteCall(siteId, {
        type,
        matching: '*',
        route
      });
      console.log(response.data);
    } else {
      for (const rot of defaultRoutes) {
        const response = await createRouteCall(siteId, rot);
        console.log(response.data);
      }
    }
    return '===========SUCCESS===========';
  } catch (err) {
    const error = err?.response?.data ?? err;
    console.log(error);
    return '===========FAILED===========';
  }
};
require('make-runnable/custom')({
  printOutputFrame: false
});
