import { customAxios } from '../utils/axios';

export const getCheckout = async (req, res) => {
  try {
    const checkoutId = req.query.checkoutId;
    const result = await customAxios('api').get(
      `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}?includes=consignments.available_shipping_options`
    );
    res.json({
      message: 'Successfully got checkout',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Getting checkout failed',
      body: error,
      status: false
    });
  }
};

export const setConsignmentToCheckout = async (req, res) => {
  try {
    const checkoutId = req.query.checkoutId;
    const data = req.body.data;
    const result = await customAxios('api').post(
      `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/consignments`,
      data
    );
    res.json({
      message: 'Successfully added consignment on checkout',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Adding consignment to checkout failed',
      body: error,
      status: false
    });
  }
};

export const updateConsignmentToCheckout = async (req, res) => {
  try {
    const checkoutId = req.query.checkoutId;
    const consignmentId = req.query.consignmentId;
    const data = req.body.data;
    const result = await customAxios('api').put(
      `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/consignments/${consignmentId}`,
      data
    );
    res.json({
      message: 'Successfully updated consignment on checkout',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Updating consigmnent to checkout failed',
      body: error,
      status: false
    });
  }
};

export const updateShippingOption = async (req, res) => {
  try {
    const checkoutId = req.query.checkoutId;
    const consignmentId = req.query.consignmentId;
    const shippingOptionId = req.query.shippingOptionId;
    const result = await customAxios(
      'api'
    ).put(
      `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/consignments/${consignmentId}`,
      { shipping_option_id: shippingOptionId }
    );
    res.json({
      message: 'Successfully added shipping option',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Adding shipping option to checkout failed',
      body: error,
      status: false
    });
  }
};

export const setBillingAddressToCheckout = async (req, res) => {
  try {
    const checkoutId = req.query.checkoutId;
    const data = req.body.data;
    const result = await customAxios('api').post(
      `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/billing-address`,
      data
    );
    res.json({
      message: 'Successfully added billing address on checkout',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Adding billing address to checkout failed',
      body: error,
      status: false
    });
  }
};

export const getPaymentMethodByOrder = async (req, res) => {
  try {
    const orderId = req.query.orderId;
    const result = await customAxios('api').get(
      `/stores/${process.env.STORE_HASH}/v3/payments/methods?order_id=${orderId}`
    );
    res.json({
      message: 'Successfully got payment methods',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Getting payment methods failed',
      body: error,
      status: false
    });
  }
};

export const processPayment = async (req, res) => {
  try {
    const orderId = req.query.orderId;
    const paymentData = req.body.data;

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

    const result = await customAxios(
      'payment',
      null,
      tokenResult.data?.data?.id
    ).post(`/stores/${process.env.STORE_HASH}/payments`, paymentData);

    res.json({
      message: 'Successfully processed payment',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Processing payment failed',
      body: error,
      status: false
    });
  }
};

export const addCoupons = async (req, res) => {
  try {
    const { checkoutId, couponCode } = req.body;

    const result = await customAxios('api').get(
      `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/coupons`,
      {
        coupon_code: couponCode
      }
    );
    res.json({
      message: 'Successfully added coupon to checkout',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Adding coupon failed',
      body: error,
      status: false
    });
  }
};
