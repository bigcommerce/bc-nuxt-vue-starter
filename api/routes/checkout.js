import { Router } from 'express';
import { getCheckout } from '../controller/checkout';
import { permissionMiddleware } from '../middleware';

const router = Router();

router.get('/getCheckout', permissionMiddleware, getCheckout);

export default router;
