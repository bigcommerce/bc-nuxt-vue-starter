const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const customerRegister = async ({ body }, context) => {
  const { variables } = JSON.parse(body);

  const { data, status } = await customAxios('api').post(
    `/stores/${process.env.STORE_HASH}/v2/customers`,
    variables
  );

  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(customerRegister)(event, context);
