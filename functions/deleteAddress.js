const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const deleteAddress = async ({ queryStringParameters }, context) => {
  const { customerId, addressId } = queryStringParameters;
  const { data, status } = await customAxios('api').delete(
    `/stores/${process.env.STORE_HASH}/v2/customers/${customerId}/addresses/${addressId}`
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) => permission(deleteAddress)(event, context);
