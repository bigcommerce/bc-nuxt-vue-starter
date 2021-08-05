const { customAxios } = require('../api/utils/axios');
const queries = require('../utils/queries');
const permission = require('./middleware/permission');

const getProductBySlug = async ({ queryStringParameters }, context) => {
  const { data, status } = await customAxios('graphql').post(`/graphql`, {
    query: queries.productBySlug(queryStringParameters)
  });
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(getProductBySlug)(event, context);
