const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const getProductOption = async ({ queryStringParameters }, context) => {
  const { productId } = queryStringParameters;
  const { data, status } = await customAxios('api').get(
    `/stores/${process.env.STORE_HASH}/v3/catalog/products/${productId}?include=options,variants,modifiers&include_fields=id`
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(getProductOption)(event, context);
