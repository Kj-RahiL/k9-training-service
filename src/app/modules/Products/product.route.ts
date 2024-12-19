import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ProductValidation } from './product.validation';
import { ProductControllers } from './product.controller';
import { USER_ROLE } from '../User/user.constant';
import Auth from '../../middleware/auth';

const router = Router();

// create product
router.post(
  '/create-product', Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(ProductValidation.productValidationSchema),
  ProductControllers.createProduct,
);

// get product by id
router.get('/:id', ProductControllers.getSingleProduct);

// get all product
router.get('/', ProductControllers.getAllProduct);

// update product
router.put(
  '/:id',Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductControllers.updateProduct,
);

// delete product
router.delete('/:id',Auth(USER_ROLE.superAdmin, USER_ROLE.admin), ProductControllers.deleteProduct);

export const ProductRoutes = router;
