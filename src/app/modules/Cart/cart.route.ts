import { Router } from 'express';
import Auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { CartValidation } from './cart.validation';
import { CartController } from './cart.controller';

const router = Router();

// create cart
router.post(
  '/',
  Auth(USER_ROLE.trainer, USER_ROLE.user),
  validateRequest(CartValidation.CartValidationSchema),
  CartController.createCart,
);

// get cart by user
router.get(
  '/',
  Auth(USER_ROLE.trainer, USER_ROLE.user),
  CartController.getCartByUser,
);

// get all cart by admin
router.get('/admin', Auth(USER_ROLE.admin), CartController.getAllCartByAdmin);

// update cart quantity
router.put(
  '/',
  Auth(USER_ROLE.trainer, USER_ROLE.user),
  validateRequest(CartValidation.updateCartValidationSchema),
  CartController.updateCartQuantity,
);

// delete cart
router.delete('/:id', CartController.deleteCart);

export const CartRoutes = router;
