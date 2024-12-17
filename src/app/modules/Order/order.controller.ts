import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrderService } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
    const {id} =req.user
  const result = await OrderService.createOrderIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order created successfully!",
    data: result,
  });
});

const getOrderByUser = catchAsync(async (req, res) => {
    const {id} =req.user
  const result = await OrderService.getOrderByUserFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order retrieved successfully!",
    data: result,
  });
});

const getAllOrderByAdmin = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrder();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Orders are retrieved successfully!",
    data: result,
  });
});

const updateOrderQuantity = catchAsync(async (req, res) => {
    const { id } = req.user; // User ID from logged-in user
    const { product, quantity } = req.body; 
  
    const result = await OrderService.updateOrderQuantityIntoDB(id, product, quantity);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order quantity updated successfully!",
      data: result,
    });
  });

const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderService.deleteOrderIntoDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order deleted successfully!",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getOrderByUser,
  getAllOrderByAdmin,
  updateOrderQuantity,
  deleteOrder,
};
