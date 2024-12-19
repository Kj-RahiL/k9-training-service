import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ServiceValidation } from './service.validation';
import { ServiceControllers } from './service.controller';
import Auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

//create admin
router.post(
  '/create-service', Auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.trainer),
  validateRequest(ServiceValidation.serviceValidationSchema),
  ServiceControllers.createService,
);

//get single service
router.get('/:id',Auth(), ServiceControllers.getSingleService);

//update
router.put(
  '/:id',Auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.trainer),
  validateRequest(ServiceValidation.updateServiceValidationSchema),
  ServiceControllers.updateService,
);
//delete
router.delete('/:id',Auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.trainer), ServiceControllers.deleteService);

//getAll
router.get('/',Auth(), ServiceControllers.getAllService);

export const ServiceRoutes = router;
