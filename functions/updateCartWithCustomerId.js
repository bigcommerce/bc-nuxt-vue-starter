const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const updateCartWithCustomerId = async ({ queryStringParameters }, context) => {
  const { cartId, customerId } = queryStringParameters;
  const { data, status } = await customAxios('api').put(
    `/stores/${process.env.STORE_HASH}/v3/carts/${cartId}`,
    {
      customer_id: customerId
    }
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(updateCartWithCustomerId)(event, context);
