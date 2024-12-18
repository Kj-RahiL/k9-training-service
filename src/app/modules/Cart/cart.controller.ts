import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CartService } from './cart.service';

const createCart = catchAsync(async (req, res) => {
  const { id } = req.user;
  const result = await CartService.createCartIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart created successfully!',
    data: result,
  });
});

const getCartByUser = catchAsync(async (req, res) => {
  const { id } = req.user;
  const result = await CartService.getCartByUserFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart retrieved successfully!',
    data: result,
  });
});

const getAllCartByAdmin = catchAsync(async (req, res) => {
  const result = await CartService.getAllCart();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Carts are retrieved successfully!',
    data: result,
  });
});

const updateCartQuantity = catchAsync(async (req, res) => {
  const { id } = req.user; // User ID from logged-in user
  const { product, quantity } = req.body;

  const result = await CartService.updateCartQuantityIntoDB(
    id,
    product,
    quantity,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart quantity updated successfully!',
    data: result,
  });
});

const deleteCart = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CartService.deleteCartIntoDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart deleted successfully!',
    data: result,
  });
});

export const CartController = {
  createCart,
  getCartByUser,
  getAllCartByAdmin,
  updateCartQuantity,
  deleteCart,
};
