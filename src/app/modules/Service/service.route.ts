
import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ServiceValidation } from './service.validation';

const router = express.Router();

//create admin
router.post(
  '/create-service',
 validateRequest(ServiceValidation.serviceValidationSchema)
);

//get single user
router.get('/:id', );

//update
router.put(
  '/:id',
  validateRequest(ServiceValidation.updateServiceValidationSchema)
);
//delete
router.delete(
  '/:id',
);

//getAll
router.get('/', );

export const ServiceRoutes = router;
