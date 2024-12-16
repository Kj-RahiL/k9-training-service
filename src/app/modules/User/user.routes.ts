
import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidations } from './user.validation';
import { userControllers } from './user.controllers';


const router = express.Router();

//create admin
router.post(
  '/create-admin',
  validateRequest(UserValidations.userValidationSchema),
  userControllers.createAdmin,
);

//get single user
router.get('/:id', userControllers.getUser);

//update
router.put(
  '/:id',
  validateRequest(UserValidations.updateUserValidationSchema),
  userControllers.updateUser,
);
//delete
router.delete(
  '/:id',
  userControllers.deleteUser,
);

//get All user
router.get('/', userControllers.getAllUser);

export const UserRoutes = router;
