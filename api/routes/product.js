import { Router } from 'express';
import {
  getProductsByCategory,
  getProductBySlug,
  getCategories,
  searchProductByKey
} from '../controller/product';
import { permissionMiddleware } from '../middleware';

const router = Router();

router.get(
  '/getProductsByCategory',
  permissionMiddleware,
  getProductsByCategory
);
router.get('/getProductBySlug', permissionMiddleware, getProductBySlug);
router.get('/getCategories', permissionMiddleware, getCategories);
router.get('/searchProductByKey', permissionMiddleware, searchProductByKey);

export default router;
