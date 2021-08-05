const { customAxios } = require('../api/utils/axios');
const queries = require('../utils/queries');
const permission = require('./middleware/permission');

const customerLogOut = async ({ body }, context) => {
  const { cookie } = JSON.parse(body);

  const { data, status } = await customAxios('graphql', cookie).post(
    `/graphql`,
    {
      query: queries.customerLogOut()
    }
  );

  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(customerLogOut)(event, context);
