import { customAxios } from '../utils/axios';

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
