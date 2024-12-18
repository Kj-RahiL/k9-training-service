import { Router } from 'express';
import { PaymentController } from './payment.controller';

const router = Router();

router.post('/checkout', PaymentController.checkOut);

export const PaymentRoutes = router;
