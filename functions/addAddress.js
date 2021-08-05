const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const addAddress = async ({ queryStringParameters, body }, context) => {
  const { customerId } = queryStringParameters;
  const { address } = JSON.parse(body);
  const { data, status } = await customAxios('api').post(
    `/stores/${process.env.STORE_HASH}/v2/customers/${customerId}/addresses`,
    address
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) => permission(addAddress)(event, context);
