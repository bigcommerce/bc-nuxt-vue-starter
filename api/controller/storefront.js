import { customAxios } from '../utils/axios';
const queries = require('../../utils/queries');

export const storefront = async (req, res, next) => {
  const field = req.query.field;
  try {
    const { data } = await customAxios('api').get(
      `/stores/${process.env.STORE_HASH}/v3/settings/storefront/${field}?channel_id=${process.env.CHANNEL_ID}`
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getHomePageContentWidgets = async (req, res, next) => {
  try {
    const { data } = await customAxios('graphql').post(`/graphql`, {
      query: queries.homePageContentWidgets()
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
