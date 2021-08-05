import { customAxios } from '../utils/axios';
const queries = require('../../utils/queries');

export const customerLogin = async (req, res, next) => {
  try {
    const variables = req.body.variables;
    const loginRes = await customAxios('graphql').post(`/graphql`, {
      query: queries.customerLogin(),
      variables
    });

    const cookies = loginRes.headers['set-cookie'].filter((item) =>
      item.includes('SHOP_TOKEN')
    );

    const { data } = await customAxios('graphql', cookies[0]).post(`/graphql`, {
      query: queries.getCustomer()
    });

    res.json({
      ...data,
      cookie: loginRes.headers['set-cookie'][0]
    });
  } catch (error) {
    next(error);
  }
};

export const customerRegister = async (req, res, next) => {
  try {
    const variables = req.body.variables;
    const { data } = await customAxios('api').post(
      `/stores/${process.env.STORE_HASH}/v2/customers`,
      variables
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const customerLogOut = async (req, res, next) => {
  try {
    const cookie = req.body.cookie;
    const { data } = await customAxios('graphql', cookie).post(`/graphql`, {
      query: queries.customerLogOut()
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
};
