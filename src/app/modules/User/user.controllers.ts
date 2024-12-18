import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.services';

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.createAdminIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

const createTrainer = catchAsync(async (req, res) => {
  console.log('hit trainer');
  const result = await UserServices.createTrainerIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Trainer created successfully',
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUser();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrieved successfully!',
    data: result,
  });
});

const getUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getUserFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log('api hit', id, req.params);
  const result = await UserServices.updateUserIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully!',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserIntoDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Deleted successfully!',
    data: result,
  });
});

export const userControllers = {
  createAdmin,
  createTrainer,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
};
