const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const updateAddress = async ({ queryStringParameters, body }, context) => {
  const { customerId, addressId } = queryStringParameters;
  const { address } = JSON.parse(body);
  const { data, status } = await customAxios('api').put(
    `/stores/${process.env.STORE_HASH}/v2/customers/${customerId}/addresses/${addressId}`,
    address
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) => permission(updateAddress)(event, context);
