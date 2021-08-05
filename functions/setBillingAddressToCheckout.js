const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const setBillingAddressToCheckout = async (
  { queryStringParameters, body },
  context
) => {
  const { checkoutId } = queryStringParameters;
  const { data } = JSON.parse(body);

  const result = await customAxios('api').post(
    `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/billing-address`,
    data
  );
  return {
    body: JSON.stringify(result.data),
    statusCode: result.status
  };
};

exports.handler = (event, context) =>
  permission(setBillingAddressToCheckout)(event, context);
