import { customAxios } from '../utils/axios';
const queries = require('../../utils/queries');

export const searchProductByKey = async (req, res, next) => {
  try {
    const searchKey = req.query.key;
    const { data } = await customAxios('api').get(
      `/stores/${process.env.STORE_HASH}/v3/catalog/products?keyword=${searchKey}&keyword_context=${searchKey}&include=primary_image`
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const { data } = await customAxios('graphql').post(`/graphql`, {
      query: queries.category()
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory = async (req, res, next) => {
  try {
    const path = req.query.path;
    const pageParam = req.query.pageParam;
    const { data } = await customAxios('graphql').post(`/graphql`, {
      query: queries.productsByCategory(path, pageParam)
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = async (req, res, next) => {
  try {
    const { data } = await customAxios('graphql').post(`/graphql`, {
      query: queries.productBySlug(req.query)
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getProductOption = async (req, res, next) => {
  try {
    const productId = req.query.productId;
    const { data } = await customAxios('api').get(
      `/stores/${process.env.STORE_HASH}/v3/catalog/products/${productId}?include=options,variants,modifiers&include_fields=id`
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};
