import { customAxios } from '../utils/axios';

export const getStorefrontSeo = async (req, res) => {
  try {
    const result = await customAxios('api').get(
      `/stores/${process.env.STORE_HASH}/v3/settings/storefront/seo?channel_id=${process.env.CHANNEL_ID}`
    );
    res.json({
      message: 'Successfully got seo data',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Getting seo data failed',
      body: error,
      status: false
    });
  }
};
