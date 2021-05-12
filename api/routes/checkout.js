import { Router } from 'express';
import {
  getCheckout,
  addConsignmentToCheckout,
  updateConsignmentToCheckout
} from '../controller/checkout';
import { permissionMiddleware } from '../middleware';

const router = Router();

router.get('/getCheckout', permissionMiddleware, getCheckout);
router.post(
  '/addConsignmentToCheckout',
  permissionMiddleware,
  addConsignmentToCheckout
);
router.put(
  '/updateConsignmentToCheckout',
  permissionMiddleware,
  updateConsignmentToCheckout
);

export default router;
