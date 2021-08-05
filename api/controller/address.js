import { customAxios } from '../utils/axios';

export const getAllAddresses = async (req, res, next) => {
  try {
    const customerId = req.query.customerId;
    const { data } = await customAxios('api').get(
      `/stores/${process.env.STORE_HASH}/v2/customers/${customerId}/addresses`
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const customerId = req.query.customerId;
    const addressId = req.query.addressId;
    const address = req.body.address;
    const { data } = await customAxios('api').put(
      `/stores/${process.env.STORE_HASH}/v2/customers/${customerId}/addresses/${addressId}`,
      address
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const addAddress = async (req, res, next) => {
  try {
    const customerId = req.query.customerId;
    const address = req.body.address;
    const { data } = await customAxios('api').post(
      `/stores/${process.env.STORE_HASH}/v2/customers/${customerId}/addresses`,
      address
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const customerId = req.query.customerId;
    const addressId = req.query.addressId;
    const { data } = await customAxios('api').delete(
      `/stores/${process.env.STORE_HASH}/v2/customers/${customerId}/addresses/${addressId}`
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};
