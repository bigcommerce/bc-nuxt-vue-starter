import { customAxios } from '../utils/axios';

export const getCheckout = async (req, res) => {
  try {
    const checkoutId = req.query.checkoutId;
    const result = await customAxios('api').get(
      `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}`
    );
    res.json({
      message: 'Successfully got checkout',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Getting checkout failed',
      body: error,
      status: false
    });
  }
};
