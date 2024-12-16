import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductService } from "./product.service";


const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product created successfully!",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.getSingleProductFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product retrieved successfully!",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProduct();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products are retrieved successfully!",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.updateProductIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product updated successfully!",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.deleteProductIntoDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product deleted successfully!",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getSingleProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
