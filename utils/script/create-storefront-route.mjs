import args from 'yargs';
import dotenv from 'dotenv';
import axios from 'axios';
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

const siteId = args.argv._[0];
const type = args.argv._[1];
const route = args.argv._[2];

const createRoute = async (route) => {
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

(async () => {
  try {
    if (type && route) {
      const response = await createRoute({
        type,
        route,
        matching: '*'
      });
      console.log(response.data.data);
    } else {
      for (const rot of defaultRoutes) {
        const response = await createRoute(rot);
        console.log(response.data.data);
      }
    }
  } catch (e) {
    console.log(e?.response?.data);
  }
})();
