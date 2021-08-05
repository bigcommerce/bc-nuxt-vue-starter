const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const deleteCartItem = async ({ queryStringParameters }, context) => {
  const { cartId, itemId } = queryStringParameters;
  const { data, status } = await customAxios('api').delete(
    `/stores/${process.env.STORE_HASH}/v3/carts/${cartId}/items/${itemId}?include=redirect_urls`
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(deleteCartItem)(event, context);
