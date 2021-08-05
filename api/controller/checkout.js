import { customAxios } from '../utils/axios';

export const getCheckout = async (req, res, next) => {
  try {
    const checkoutId = req.query.checkoutId;
    const { data } = await customAxios('api').get(
      `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}?includes=consignments.available_shipping_options`
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const setConsignmentToCheckout = async (req, res, next) => {
  try {
    const checkoutId = req.query.checkoutId;
    const consignment = req.body.consignment;
    const { data } = await customAxios('api').post(
      `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/consignments`,
      consignment
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const updateConsignmentToCheckout = async (req, res, next) => {
  try {
    const checkoutId = req.query.checkoutId;
    const consignmentId = req.query.consignmentId;
    const consignment = req.body.consignment;
    const { data } = await customAxios('api').put(
      `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/consignments/${consignmentId}`,
      consignment
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const updateShippingOption = async (req, res, next) => {
  try {
    const checkoutId = req.query.checkoutId;
    const consignmentId = req.query.consignmentId;
    const shippingOptionId = req.query.shippingOptionId;
    const { data } = await customAxios(
      'api'
    ).put(
      `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/consignments/${consignmentId}`,
      { shipping_option_id: shippingOptionId }
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const setBillingAddressToCheckout = async (req, res, next) => {
  try {
    const checkoutId = req.query.checkoutId;
    const billData = req.body.data;
    const { data } = await customAxios('api').post(
      `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/billing-address`,
      billData
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getPaymentMethodByOrder = async (req, res, next) => {
  try {
    const orderId = req.query.orderId;
    const { data } = await customAxios('api').get(
      `/stores/${process.env.STORE_HASH}/v3/payments/methods?order_id=${orderId}`
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const processPayment = async (req, res, next) => {
  try {
    const orderId = req.query.orderId;
    const paymentData = req.body.payment;

    paymentData.payment.instrument.expiry_month = parseInt(
      paymentData.payment.instrument.expiry_month
    );
    paymentData.payment.instrument.expiry_year = parseInt(
      paymentData.payment.instrument.expiry_year
    );

    const tokenResult = await customAxios('api').post(
      `/stores/${process.env.STORE_HASH}/v3/payments/access_tokens`,
      {
        order: {
          id: parseInt(orderId)
        }
      }
    );

    const { data } = await customAxios(
      'payment',
      null,
      tokenResult.data?.data?.id
    ).post(`/stores/${process.env.STORE_HASH}/payments`, paymentData);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const addCoupons = async (req, res, next) => {
  try {
    const { checkoutId, couponCode } = req.body;

    const { data } = await customAxios('api').get(
      `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/coupons`,
      {
        coupon_code: couponCode
      }
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};
