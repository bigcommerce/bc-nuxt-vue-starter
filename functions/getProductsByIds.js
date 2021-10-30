const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const getProductsByIds = async ({ queryStringParameters }, context) => {
  const { productIds } = queryStringParameters;
  const { data, status } = await customAxios('api').get(
    `/stores/${process.env.STORE_HASH}/v3/catalog/products?include_fields=name,description,price&include=variants,primary_image&id:in=${productIds}`
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(getProductsByIds)(event, context);
