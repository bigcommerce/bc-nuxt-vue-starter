const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const updateShippingOption = async ({ queryStringParameters }, context) => {
  const { checkoutId, consignmentId, shippingOptionId } = queryStringParameters;

  const { data, status } = await customAxios(
    'api'
  ).put(
    `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/consignments/${consignmentId}`,
    { shipping_option_id: shippingOptionId }
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(updateShippingOption)(event, context);
