import { Router } from 'express';
import {
  getAllAddresses,
  updateAddress,
  addAddress,
  deleteAddress
} from '../controller/address';
import { permissionMiddleware } from '../middleware';

const router = Router();

router.get('/getAllAddresses', permissionMiddleware, getAllAddresses);
router.put('/updateAddress', permissionMiddleware, updateAddress);
router.post('/addAddress', permissionMiddleware, addAddress);
router.delete('/deleteAddress', permissionMiddleware, deleteAddress);

export default router;
