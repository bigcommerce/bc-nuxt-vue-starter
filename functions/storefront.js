const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const storefront = async ({ queryStringParameters }, context) => {
  const { field } = queryStringParameters;
  const { data, status } = await customAxios('api').get(
    `/stores/${process.env.STORE_HASH}/v3/settings/storefront/${field}?channel_id=${process.env.CHANNEL_ID}`
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) => permission(storefront)(event, context);
