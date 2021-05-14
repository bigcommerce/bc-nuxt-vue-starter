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
      message: 'Adding consigmnent to checkout failed',
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

export const createOrder = async (req, res) => {
  try {
    const checkoutId = req.query.checkoutId;
    const result = await customAxios('api').post(
      `/stores/${process.env.STORE_HASH}/v3/checkouts/${checkoutId}/orders`
    );
    res.json({
      message: 'Successfully created an order with checkout',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Creating order failed',
      body: error,
      status: false
    });
  }
};
