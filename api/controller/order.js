import { customAxios } from '../utils/axios';

export const getAllOrders = async (req, res, next) => {
  try {
    const customerId = req.query.customerId;
    const { data } = await customAxios('api').get(
      `/stores/${process.env.STORE_HASH}/v2/orders?customer_id=${customerId}&channel_id=${process.env.CHANNEL_ID}`
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const checkoutId = req.query.checkoutId;
    const { data } = await customAxios('api').post(
      `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/orders`
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};
