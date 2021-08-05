const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const updateCartItem = async ({ queryStringParameters, body }, context) => {
  const { cartData } = JSON.parse(body);
  const { cartId, itemId } = queryStringParameters;
  const { data, status } = await customAxios('api').put(
    `/stores/${process.env.STORE_HASH}/v3/carts/${cartId}/items/${itemId}?include=redirect_urls`,
    cartData
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(updateCartItem)(event, context);
