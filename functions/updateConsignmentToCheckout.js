const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const updateConsignmentToCheckout = async (
  { queryStringParameters, body },
  context
) => {
  const { checkoutId, consignmentId } = queryStringParameters;
  const { consignment } = JSON.parse(body);

  const { data, status } = await customAxios('api').put(
    `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/consignments/${consignmentId}`,
    consignment
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(updateConsignmentToCheckout)(event, context);
