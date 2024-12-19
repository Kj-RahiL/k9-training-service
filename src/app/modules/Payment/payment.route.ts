import { Router } from 'express';
import { PaymentController } from './payment.controller';
import validateRequest from '../../middleware/validateRequest';
import { OrderDataSchema } from './payment.validation';

const router = Router();

router.post(
  '/checkout',
  validateRequest(OrderDataSchema),
  PaymentController.checkOut,
);

export const PaymentRoutes = router;
