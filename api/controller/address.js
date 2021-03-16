import { customAxios } from '../utils/axios';

export const getAllAddresses = async (req, res) => {
  try {
    const customerId = req.query.customerId;
    const result = await customAxios('api').get(
      `/stores/${process.env.STORE_HASH}/v2/customers/${customerId}/addresses`
    );
    res.json({
      message: 'Successfully got customer addresses',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Getting customer addresses failed',
      body: error,
      status: false
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const customerId = req.query.customerId;
    const addressId = req.query.addressId;
    const address = req.body.address;
    const result = await customAxios('api').put(
      `/stores/${process.env.STORE_HASH}/v2/customers/${customerId}/addresses/${addressId}`,
      address
    );
    res.json({
      message: 'Successfully updated customer address',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Updating customer address failed',
      body: error,
      status: false
    });
  }
};

export const addAddress = async (req, res) => {
  try {
    const customerId = req.query.customerId;
    const address = req.body.address;
    const result = await customAxios('api').post(
      `/stores/${process.env.STORE_HASH}/v2/customers/${customerId}/addresses`,
      address
    );
    res.json({
      message: 'Successfully added customer address',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Adding customer address failed',
      body: error,
      status: false
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const customerId = req.query.customerId;
    const addressId = req.query.addressId;
    const result = await customAxios('api').delete(
      `/stores/${process.env.STORE_HASH}/v2/customers/${customerId}/addresses/${addressId}`
    );
    res.json({
      message: 'Successfully deleted customer address',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Deleting customer address failed',
      body: error,
      status: false
    });
  }
};
