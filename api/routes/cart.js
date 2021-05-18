import { Router } from 'express';
import {
  getCart,
  createCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  updateCartWithCustomerId
} from '../controller/cart';
import { permissionMiddleware } from '../middleware';

const router = Router();

router.get('/getCart', permissionMiddleware, getCart);
router.post('/createCart', permissionMiddleware, createCart);
router.post('/addCartItem', permissionMiddleware, addCartItem);
router.put('/updateCartItem', permissionMiddleware, updateCartItem);
router.delete('/deleteCartItem', permissionMiddleware, deleteCartItem);
router.put(
  '/updateCartWithCustomerId',
  permissionMiddleware,
  updateCartWithCustomerId
);

export default router;
