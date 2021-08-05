const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const getCart = async ({ body }, context) => {
  const { cartData } = JSON.parse(body);
  const { data, status } = await customAxios('api').post(
    `/stores/${process.env.STORE_HASH}/v3/carts?include=redirect_urls`,
    cartData
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) => permission(getCart)(event, context);
