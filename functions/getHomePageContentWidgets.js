const { customAxios } = require('../api/utils/axios');
const queries = require('../utils/queries');
const permission = require('./middleware/permission');

const getHomePageContentWidgets = async (event, context) => {
  const { data, status } = await customAxios('graphql').post(`/graphql`, {
    query: queries.homePageContentWidgets()
  });

  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(getHomePageContentWidgets)(event, context);
