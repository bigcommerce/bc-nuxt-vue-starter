const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const getCheckout = async ({ queryStringParameters }, context) => {
  const { checkoutId } = queryStringParameters;

  const { data, status } = await customAxios('api').get(
    `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}?includes=consignments.available_shipping_options`
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) => permission(getCheckout)(event, context);
