import { Router } from 'express';
import {
  customerLogin,
  customerLogOut,
  customerRegister
} from '../controller/customer';

const router = Router();

router.post('/customerLogin', customerLogin);
router.post('/customerRegister', customerRegister);
router.post('/customerLogOut', customerLogOut);

export default router;
