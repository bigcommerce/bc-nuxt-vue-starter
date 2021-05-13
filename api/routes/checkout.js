import { Router } from 'express';
import { getCheckout, setConsignmentToCheckout } from '../controller/checkout';
import { permissionMiddleware } from '../middleware';

const router = Router();

router.get('/getCheckout', permissionMiddleware, getCheckout);
router.post(
  '/setConsignmentToCheckout',
  permissionMiddleware,
  setConsignmentToCheckout
);

export default router;
