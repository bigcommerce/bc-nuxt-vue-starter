import { Router } from 'express';
import { customerLogin, customerLogOut } from '../controller/customer';

const router = Router();

router.post('/customerLogin', customerLogin);
router.post('/customerLogOut', customerLogOut);

export default router;
