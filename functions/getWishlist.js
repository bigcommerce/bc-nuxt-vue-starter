const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const getWishlist = async ({ queryStringParameters }, context) => {
  const { wishlistId } = queryStringParameters;
  const { data, status } = await customAxios('api').get(
    `/stores/${process.env.STORE_HASH}/v3/wishlists/${wishlistId}`
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) => permission(getWishlist)(event, context);
