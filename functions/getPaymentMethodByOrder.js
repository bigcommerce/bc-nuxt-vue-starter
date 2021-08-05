const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const getPaymentMethodByOrder = async ({ queryStringParameters }, context) => {
  const { orderId } = queryStringParameters;

  const { data, status } = await customAxios('api').get(
    `/stores/${process.env.STORE_HASH}/v3/payments/methods?order_id=${orderId}`
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(getPaymentMethodByOrder)(event, context);
