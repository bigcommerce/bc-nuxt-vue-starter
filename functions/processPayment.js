const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const processPayment = async ({ queryStringParameters, body }, context) => {
  const { orderId } = queryStringParameters;
  const { paymentData } = JSON.parse(body);

  paymentData.payment.instrument.expiry_month = parseInt(
    paymentData.payment.instrument.expiry_month
  );
  paymentData.payment.instrument.expiry_year = parseInt(
    paymentData.payment.instrument.expiry_year
  );

  const tokenResult = await customAxios('api').post(
    `/stores/${process.env.STORE_HASH}/v3/payments/access_tokens`,
    {
      order: {
        id: parseInt(orderId)
      }
    }
  );

  const { data, status } = await customAxios(
    'payment',
    null,
    tokenResult.data?.data?.id
  ).post(`/stores/${process.env.STORE_HASH}/payments`, paymentData);

  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(processPayment)(event, context);
