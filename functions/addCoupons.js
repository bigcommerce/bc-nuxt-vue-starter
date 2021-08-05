const { customAxios } = require('../api/utils/axios');
const permission = require('./middleware/permission');

const processPayment = async ({ body }, context) => {
  const { checkoutId, couponCode } = JSON.parse(body);

  const { data, status } = await customAxios('api').get(
    `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/coupons`,
    {
      coupon_code: couponCode
    }
  );
  return {
    body: JSON.stringify(data),
    statusCode: status
  };
};

exports.handler = (event, context) =>
  permission(processPayment)(event, context);
