import { customAxios } from '../utils/axios';

export const getAllOrders = async (req, res) => {
  try {
    const customerId = req.query.customerId;
    const result = await customAxios('api').get(
      `/stores/${process.env.STORE_HASH}/v2/orders?customer_id=${customerId}&channel_id=${process.env.CHANNEL_ID}`
    );
    res.json({
      message: 'Successfully got orders',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Getting orders failed',
      body: error,
      status: false
    });
  }
};
