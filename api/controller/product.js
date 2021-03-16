import queries from '../../utils/queries';
import { customAxios } from '../utils/axios';

export const shopAll = async (req, res) => {
  try {
    const result = await customAxios('graphql').post(`/graphql`, {
      query: queries.shopAll()
    });
    res.json({
      message: 'Successfully got all products',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Getting all products failed',
      body: error,
      status: false
    });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const result = await customAxios('graphql').post(`/graphql`, {
      query: queries.productBySlug(req.query)
    });
    res.json({
      message: 'Successfully got a product by slug',
      body: result.data,
      status: true
    });
  } catch (error) {
    res.json({
      message: 'Getting a product by slug failed',
      body: error,
      status: false
    });
  }
};
