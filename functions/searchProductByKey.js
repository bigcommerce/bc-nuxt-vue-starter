const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const searchProductByKey = async ({ queryStringParameters }, context) => {
  const { key } = queryStringParameters;
  const { data, status } = await customAxios('api').get(
    `/stores/${process.env.STORE_HASH}/v3/catalog/products?keyword=${key}&keyword_context=${key}&include=primary_image`
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(searchProductByKey)(event, context);
