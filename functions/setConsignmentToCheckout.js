const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const setConsignmentToCheckout = async (
  { queryStringParameters, body },
  context
) => {
  const { checkoutId } = queryStringParameters;
  const { consignment } = JSON.parse(body);

  const { data, status } = await customAxios('api').post(
    `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/consignments`,
    consignment
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(setConsignmentToCheckout)(event, context);
