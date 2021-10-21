const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const addToWishlistItem = async ({ queryStringParameters, body }, context) => {
  const { wishlistData } = JSON.parse(body);
  const { wishlistId } = queryStringParameters;
  const { data, status } = await customAxios('api').post(
    `/stores/${process.env.STORE_HASH}/v3/wishlists/${wishlistId}/items`,
    wishlistData
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(addToWishlistItem)(event, context);
