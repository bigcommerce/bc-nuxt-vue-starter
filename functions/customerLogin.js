const { customAxios } = require('../api/utils/axios');
const queries = require('../utils/queries');
const permission = require('./middleware/permission');

const customerLogin = async ({ body }, context) => {
  const { variables } = JSON.parse(body);

  const loginRes = await customAxios('graphql').post(`/graphql`, {
    query: queries.customerLogin(),
    variables
  });

  const cookies = loginRes.headers['set-cookie'].filter((item) =>
    item.includes('SHOP_TOKEN')
  );

  const { data, status } = await customAxios('graphql', cookies[0]).post(
    `/graphql`,
    {
      query: queries.getCustomer()
    }
  );

  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) => permission(customerLogin)(event, context);
