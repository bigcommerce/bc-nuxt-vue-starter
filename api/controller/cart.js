import { customAxios } from '../utils/axios';

export const getCart = async (req, res, next) => {
  try {
    const cartId = req.query.cartId;
    const { data } = await customAxios('api').get(
      `/stores/${process.env.STORE_HASH}/v3/carts/${cartId}?include=redirect_urls,line_items.physical_items.options`
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createCart = async (req, res, next) => {
  try {
    const cartData = req.body.cartData;
    const { data } = await customAxios('api').post(
      `/stores/${process.env.STORE_HASH}/v3/carts?include=redirect_urls`,
      cartData
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const addCartItem = async (req, res, next) => {
  try {
    const cartId = req.query.cartId;
    const cartData = req.body.cartData;
    const { data } = await customAxios('api').post(
      `/stores/${process.env.STORE_HASH}/v3/carts/${cartId}/items?include=redirect_urls`,
      cartData
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const cartId = req.query.cartId;
    const itemId = req.query.itemId;
    const cartData = req.body.cartData;
    const { data } = await customAxios('api').put(
      `/stores/${process.env.STORE_HASH}/v3/carts/${cartId}/items/${itemId}?include=redirect_urls`,
      cartData
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteCartItem = async (req, res, next) => {
  try {
    const cartId = req.query.cartId;
    const itemId = req.query.itemId;
    const { data } = await customAxios('api').delete(
      `/stores/${process.env.STORE_HASH}/v3/carts/${cartId}/items/${itemId}?include=redirect_urls`
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const updateCartWithCustomerId = async (req, res, next) => {
  try {
    const cartId = req.query.cartId;
    const customerId = req.query.customerId;
    const { data } = await customAxios('api').put(
      `/stores/${process.env.STORE_HASH}/v3/carts/${cartId}`,
      {
        customer_id: customerId
      }
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};
