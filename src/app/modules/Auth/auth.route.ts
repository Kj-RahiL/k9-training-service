import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { UserValidations } from "../User/user.validation";
import { AuthControllers } from "./auth.controller";

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




export const AuthRoutes = router;