const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const addCartItem = async ({ queryStringParameters, body }, context) => {
  const { cartData } = JSON.parse(body);
  const { cartId } = queryStringParameters;
  const { data, status } = await customAxios('api').post(
    `/stores/${process.env.STORE_HASH}/v3/carts/${cartId}/items?include=redirect_urls`,
    cartData
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) => permission(addCartItem)(event, context);
