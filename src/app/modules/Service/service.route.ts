import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ServiceValidation } from './service.validation';
import { ServiceControllers } from './service.controller';

const router = express.Router();

//create admin
router.post(
  '/create-service',
  validateRequest(ServiceValidation.serviceValidationSchema),
  ServiceControllers.createService,
);

//get single user
router.get('/:id', ServiceControllers.getSingleService);

//update
router.put(
  '/:id',
  validateRequest(ServiceValidation.updateServiceValidationSchema),
  ServiceControllers.updateService,
);
//delete
router.delete('/:id', ServiceControllers.deleteService);

//getAll
router.get('/', ServiceControllers.getAllService);

export const ServiceRoutes = router;
