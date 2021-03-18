import { Router } from 'express';
import { shopAll, getProductBySlug } from '../controller/product';
import { permissionMiddleware } from '../middleware';

const router = Router();

router.get('/shopAll', permissionMiddleware, shopAll);
router.get('/getProductBySlug', permissionMiddleware, getProductBySlug);

export default router;
