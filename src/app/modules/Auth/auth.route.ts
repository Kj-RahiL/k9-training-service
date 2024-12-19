import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { UserValidations } from '../User/user.validation';
import { AuthControllers } from './auth.controller';
import Auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);

router.post(
  '/register',
  validateRequest(UserValidations.userValidationSchema),
  AuthControllers.signup,
);

router.post(
  '/change-password',
  Auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

// forget password to verify otp and reset password
router.post('/forget-password', AuthControllers.forgetPassword);
router.post('/verifyOtp', AuthControllers.verifyOtpAndResetPassword);


router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
