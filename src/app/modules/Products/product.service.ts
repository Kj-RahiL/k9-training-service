import AppError from "../../errors/AppError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(404, "Product Not found.");
  }
  return product;
};

const getAllProduct = async () => {
  const result = await Product.find();
  return result;
};

const updateProductIntoDB = async (id: string, payload: TProduct) => {
  const isProduct = await Product.findById(id);

  if (!isProduct) {
    throw new AppError(404, "product not found");
  }

  const product = await Product.findByIdAndUpdate(id, [{ $set: payload }], {
    new: true,
  });
  return product;
};

const deleteProductIntoDB = async (id: string) => {
  const isProduct = await Product.findById(id);
  if (!isProduct) {
    throw new AppError(404, "product not found");
  }
  const product = await Product.findByIdAndDelete(id);
  return product;
};

export const ProductService = {
  createProductIntoDB,
  getSingleProductFromDB,
  getAllProduct,
  updateProductIntoDB,
  deleteProductIntoDB,
};
