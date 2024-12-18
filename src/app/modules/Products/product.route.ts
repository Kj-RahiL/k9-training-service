import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ProductValidation } from './product.validation';
import { ProductControllers } from './product.controller';

const router = Router();

// create product
router.post(
  '/create-product',
  validateRequest(ProductValidation.productValidationSchema),
  ProductControllers.createProduct,
);

// get product by id
router.get('/:id', ProductControllers.getSingleProduct);

// get all product
router.get('/', ProductControllers.getAllProduct);

// update product
router.put(
  '/:id',
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductControllers.updateProduct,
);

// delete product
router.delete('/:id', ProductControllers.deleteProduct);

export const ProductRoutes = router;
