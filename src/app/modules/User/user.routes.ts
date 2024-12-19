import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidations } from './user.validation';
import { userControllers } from './user.controllers';
import Auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

//create admin
router.post(
  '/create-admin',
  Auth(USER_ROLE.superAdmin),
  validateRequest(UserValidations.userValidationSchema),
  userControllers.createAdmin,
);

//create admin
router.post(
  '/create-trainer',
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(UserValidations.userValidationSchema),
  userControllers.createTrainer,
);

// get me
router.get(
  '/me',
  Auth(),
  userControllers.getMe,
);

//get single user
router.get(
  '/:id',
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.trainer),
  userControllers.getUser,
);

//update
router.put(
  '/:id', Auth(),
  validateRequest(UserValidations.updateUserValidationSchema),
  userControllers.updateUser,
);
//delete
router.delete('/:id', Auth(), userControllers.deleteUser);

//get All user
router.get(
  '/',
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  userControllers.getAllUser,
);

export const UserRoutes = router;
