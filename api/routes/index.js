import { Router } from 'express';
import {
  getAllAddresses,
  updateAddress,
  addAddress,
  deleteAddress
} from '../controller/address';
import {
  getCart,
  createCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  updateCartWithCustomerId
} from '../controller/cart';
import {
  getCheckout,
  setConsignmentToCheckout,
  updateConsignmentToCheckout,
  updateShippingOption,
  setBillingAddressToCheckout,
  getPaymentMethodByOrder,
  processPayment,
  addCoupons
} from '../controller/checkout';
import {
  customerLogin,
  customerLogOut,
  customerRegister
} from '../controller/customer';
import { getAllOrders, createOrder } from '../controller/order';
import {
  getProductsByCategory,
  getProductBySlug,
  getCategories,
  searchProductByKey,
  getProductOption
} from '../controller/product';
import { permissionMiddleware } from '../middleware';

const router = Router();
// address
router.get('/getAllAddresses', permissionMiddleware, getAllAddresses);
router.put('/updateAddress', permissionMiddleware, updateAddress);
router.post('/addAddress', permissionMiddleware, addAddress);
router.delete('/deleteAddress', permissionMiddleware, deleteAddress);

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
// checkout
router.get('/getCheckout', permissionMiddleware, getCheckout);
router.post(
  '/setConsignmentToCheckout',
  permissionMiddleware,
  setConsignmentToCheckout
);
router.put(
  '/updateConsignmentToCheckout',
  permissionMiddleware,
  updateConsignmentToCheckout
);
router.put('/updateShippingOption', permissionMiddleware, updateShippingOption);
router.post(
  '/setBillingAddressToCheckout',
  permissionMiddleware,
  setBillingAddressToCheckout
);
router.get(
  '/getPaymentMethodByOrder',
  permissionMiddleware,
  getPaymentMethodByOrder
);
router.post('/processPayment', permissionMiddleware, processPayment);
router.post('/addCoupons', permissionMiddleware, addCoupons);
// customer
router.post('/customerLogin', customerLogin);
router.post('/customerRegister', customerRegister);
router.post('/customerLogOut', customerLogOut);
// order
router.get('/getAllOrders', permissionMiddleware, getAllOrders);
router.post('/createOrder', permissionMiddleware, createOrder);
// product
router.get(
  '/getProductsByCategory',
  permissionMiddleware,
  getProductsByCategory
);
router.get('/getProductBySlug', permissionMiddleware, getProductBySlug);
router.get('/getCategories', permissionMiddleware, getCategories);
router.get('/searchProductByKey', permissionMiddleware, searchProductByKey);
router.get('/getProductOption', permissionMiddleware, getProductOption);

export default router;
