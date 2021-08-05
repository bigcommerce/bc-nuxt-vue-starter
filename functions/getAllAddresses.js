const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const getAllAddresses = async ({ queryStringParameters }, context) => {
  const { customerId } = queryStringParameters;
  const { data, status } = await customAxios('api').get(
    `/stores/${process.env.STORE_HASH}/v2/customers/${customerId}/addresses`
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(getAllAddresses)(event, context);
