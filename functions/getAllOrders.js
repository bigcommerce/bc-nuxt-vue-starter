const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const getAllOrders = async ({ queryStringParameters }, context) => {
  const { customerId } = queryStringParameters;
  const { data, status } = await customAxios('api').get(
    `/stores/${process.env.STORE_HASH}/v2/orders?customer_id=${customerId}&channel_id=${process.env.CHANNEL_ID}`
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) => permission(getAllOrders)(event, context);
