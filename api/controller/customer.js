import queries from '../../utils/queries';
import { customAxios } from '../utils/axios';

export const customerLogin = async (req, res) => {
  try {
    const variables = req.body.variables;
    const loginRes = await customAxios('graphql').post(`/graphql`, {
      query: queries.customerLogin(),
      variables
    });

    const cookies = loginRes.headers['set-cookie'].filter((item) =>
      item.includes('SHOP_TOKEN')
    );

    const customerResult = await customAxios('graphql', cookies[0]).post(
      `/graphql`,
      {
        query: queries.getCustomer()
      }
    );

    res.json({
      message: 'Successfully login!',
      body: {
        ...customerResult.data,
        cookie: loginRes.headers['set-cookie'][0]
      },
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Login failed',
      body: error,
      status: false
    });
  }
};

export const customerRegister = async (req, res) => {
  try {
    const variables = req.body.variables;
    const result = await customAxios('api').post(
      `/stores/${process.env.STORE_HASH}/v2/customers`,
      variables
    );
    res.json({
      message: 'Successfully registered',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'User registration failed',
      body: error,
      status: false
    });
  }
};

export const customerLogOut = async (req, res) => {
  try {
    const cookie = req.body.cookie;
    const result = await customAxios('graphql', cookie).post(`/graphql`, {
      query: queries.customerLogOut()
    });

    res.json({
      message: 'Successfully logout!',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Logout failed',
      body: error,
      status: false
    });
  }
};
