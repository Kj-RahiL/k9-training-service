import AppError from "../../errors/AppError";
import { Product } from "../Products/product.model";
import { User } from "../User/user.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (userId: string, payload: TOrder) => {
  const existingProduct = await Product.findById(payload.product);
  if (!existingProduct) {
    throw new AppError(404, "This Product Not found.");
  }
  const existingOrder = await Order.findOne({ product: payload.product, user:userId });
  if (existingOrder) {
    throw new AppError(403, "This Product already added into cart.");
  }
  const orderData = { user: userId, ...payload }
  console.log(orderData, "hey")
  const result = await Order.create(orderData);
  return result;
};

const getOrderByUserFromDB = async (id: string) => {
    const isUser = await User.findById(id)
    if (!isUser) {
        throw new AppError(404, "This user not found");
      }
  const product = await Order.find({user: id});
  if (!product) {
    throw new AppError(404, "Order Not found.");
  }
  return product;
};

const getAllOrder = async () => {
  const result = await Order.find();
  return result;
};

const updateOrderQuantityIntoDB = async (user: string, productId: string, quantity: number) => {
    if (quantity < 1) {
      throw new AppError(400, "Quantity must be at least 1.");
    }
  
    // Find the product to get the price
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError(404, "Product not found.");
    }
  
    // Find the existing order for the user and product
    const existingOrder = await Order.findOne({ user, product: productId });
    if (!existingOrder) {
      throw new AppError(404, "Product is not in your cart.");
    }
  
    // Update quantity and recalculate total price
    existingOrder.quantity = quantity;
    existingOrder.totalPrice = product.price * quantity;
  
    // Save the updated order
    await existingOrder.save();
  
    return existingOrder;
  };
  

const deleteOrderIntoDB = async (id: string) => {
  const isOrder = await Order.findById(id);
  if (!isOrder) {
    throw new AppError(404, "product not found");
  }
  const product = await Order.findByIdAndDelete(id);
  return product;
};

export const OrderService = {
  createOrderIntoDB,
  getOrderByUserFromDB,
  getAllOrder,
  updateOrderQuantityIntoDB,
  deleteOrderIntoDB,
};
