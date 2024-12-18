import AppError from '../../errors/AppError';
import { Product } from '../Products/product.model';
import { User } from '../User/user.model';
import { TCart } from './cart.interface';
import { Cart } from './cart.model';

const createCartIntoDB = async (userId: string, payload: TCart) => {
  const existingProduct = await Product.findById(payload.product);
  if (!existingProduct) {
    throw new AppError(404, 'This Product Not found.');
  }
  const existingCart = await Cart.findOne({
    product: payload.product,
    user: userId,
  });
  if (existingCart) {
    throw new AppError(403, 'This Product already added into cart.');
  }
  const orderData = { user: userId, ...payload };
  console.log(orderData, 'hey');
  const result = await Cart.create(orderData);
  return result;
};

const getCartByUserFromDB = async (id: string) => {
  const isUser = await User.findById(id);
  if (!isUser) {
    throw new AppError(404, 'This user not found');
  }
  const product = await Cart.find({ user: id })
    .populate('user', 'name email image role')
    .populate('product', 'name image price');
  if (!product) {
    throw new AppError(404, 'Cart Not found.');
  }
  return product;
};

const getAllCart = async () => {
  const result = await Cart.find().populate('user').populate('product');
  return result;
};

const updateCartQuantityIntoDB = async (
  user: string,
  productId: string,
  quantity: number,
) => {
  if (quantity < 1) {
    throw new AppError(400, 'Quantity must be at least 1.');
  }

  // Find the product to get the price
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError(404, 'Product not found.');
  }

  // Find the existing cart for the user and product
  const existingCart = await Cart.findOne({ user, product: productId });
  if (!existingCart) {
    throw new AppError(404, 'Product is not in your cart.');
  }

  // Update quantity and recalculate total price
  existingCart.quantity = quantity;
  existingCart.totalPrice = product.price * quantity;

  // Save the updated cart
  await existingCart.save();

  return existingCart;
};

const deleteCartIntoDB = async (id: string) => {
  const isCart = await Cart.findById(id);
  if (!isCart) {
    throw new AppError(404, 'product not found');
  }
  const product = await Cart.findByIdAndDelete(id);
  return product;
};

export const CartService = {
  createCartIntoDB,
  getCartByUserFromDB,
  getAllCart,
  updateCartQuantityIntoDB,
  deleteCartIntoDB,
};
