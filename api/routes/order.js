import { Router } from 'express';
import { getAllOrders } from '../controller/order';
import { permissionMiddleware } from '../middleware';

const router = Router();

router.get('/getAllOrders', permissionMiddleware, getAllOrders);

export default router;
