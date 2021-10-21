const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const deleteWishlistItem = async ({ queryStringParameters }, context) => {
  const { wishlistId, wishlistItemId } = queryStringParameters;
  const { status } = await customAxios('api').delete(
    `/stores/${process.env.STORE_HASH}/v3/wishlists/${wishlistId}/items/${wishlistItemId}`
  );
  return {
    body: JSON.stringify(),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(deleteWishlistItem)(event, context);
