const { customAxios } = require('../api/utils/axios');
const queries = require('../utils/queries');
const permission = require('./middleware/permission');

const getProductsByCategory = async ({ queryStringParameters }, context) => {
  const { path, pageParam } = queryStringParameters;
  const { data, status } = await customAxios('graphql').post(`/graphql`, {
    query: queries.productsByCategory(path, pageParam)
  });
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(getProductsByCategory)(event, context);
