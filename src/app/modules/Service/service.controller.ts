import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServiceServices } from './service.services';

const createService = catchAsync(async (req, res) => {
  const result = await ServiceServices.createServiceIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service created successfully!',
    data: result,
  });
});
const getSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.getSingleServiceFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service retrieved successfully!',
    data: result,
  });
});
const getAllService = catchAsync(async (req, res) => {
  const result = await ServiceServices.getAllService();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Services are retrieved successfully!',
    data: result,
  });
});
const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.updateServiceIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service updated successfully!',
    data: result,
  });
});
const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.deleteServiceIntoDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service deleted successfully!',
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  getSingleService,
  getAllService,
  updateService,
  deleteService,
};
