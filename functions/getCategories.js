const { customAxios } = require('../api/utils/axios');
const queries = require('../utils/queries');
const permission = require('./middleware/permission');

const getCategories = async (event, context) => {
  const { data, status } = await customAxios('graphql').post(`/graphql`, {
    query: queries.category()
  });
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) => permission(getCategories)(event, context);
