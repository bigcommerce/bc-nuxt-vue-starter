import { customAxios } from '../utils/axios';

export const getCart = async (req, res) => {
  try {
    const cartId = req.query.cartId;
    const result = await customAxios('api').get(
      `/stores/${process.env.STORE_HASH}/v3/carts/${cartId}?include=redirect_urls`
    );
    res.json({
      message: 'Successfully got carts',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Getting carts failed',
      body: error,
      status: false
    });
  }
};

export const createCart = async (req, res) => {
  try {
    const data = req.body.cartData;
    const result = await customAxios('api').post(
      `/stores/${process.env.STORE_HASH}/v3/carts?include=redirect_urls`,
      data
    );
    res.json({
      message: 'Successfully created cart',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Creating cart failed',
      body: error,
      status: false
    });
  }
};

export const addCartItem = async (req, res) => {
  try {
    const cartId = req.query.cartId;
    const data = req.body.cartData;
    const result = await customAxios('api').post(
      `/stores/${process.env.STORE_HASH}/v3/carts/${cartId}/items?include=redirect_urls`,
      data
    );
    res.json({
      message: 'Successfully added an item to cart',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Adding an item to cart failed',
      body: error,
      status: false
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const cartId = req.query.cartId;
    const itemId = req.query.itemId;
    const data = req.body.cartData;
    const result = await customAxios('api').put(
      `/stores/${process.env.STORE_HASH}/v3/carts/${cartId}/items/${itemId}?include=redirect_urls`,
      data
    );
    res.json({
      message: 'Successfully updated cart with an item',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Updating cart with an item failed',
      body: error,
      status: false
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const cartId = req.query.cartId;
    const itemId = req.query.itemId;
    const result = await customAxios('api').delete(
      `/stores/${process.env.STORE_HASH}/v3/carts/${cartId}/items/${itemId}?include=redirect_urls`
    );
    res.json({
      message: 'Successfully deleted item or cart',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Deleting item or cart failed',
      body: error,
      status: false
    });
  }
};
