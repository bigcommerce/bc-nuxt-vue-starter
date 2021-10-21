const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const createWishlist = async ({ body }, context) => {
  const { wishlistData } = JSON.parse(body);
  const { data, status } = await customAxios('api').post(
    `/stores/${process.env.STORE_HASH}/v3/wishlists`,
    wishlistData
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(createWishlist)(event, context);
