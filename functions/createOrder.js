const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const createOrder = async ({ queryStringParameters }, context) => {
  const { checkoutId } = queryStringParameters;
  const { data, status } = await customAxios('api').post(
    `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/orders`
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) => permission(createOrder)(event, context);
