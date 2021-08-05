const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const getCart = async ({ queryStringParameters }, context) => {
  const { cartId } = queryStringParameters;

  const { data, status } = await customAxios('api').get(
    `/stores/${process.env.STORE_HASH}/v3/carts/${cartId}?include=redirect_urls,line_items.physical_items.options`
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) => permission(getCart)(event, context);
