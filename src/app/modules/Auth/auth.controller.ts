

import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { User } from '../User/user.model';
import { AuthServices } from './auth.service';

const signup = catchAsync(async (req, res) => {
  const result = await AuthServices.signupFromDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User registered successfully!',
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.loginIntoDB(
    req.body,
  );
  const { accessToken, refreshToken } = result

  const user = await User.findOne({ email: req.body.email });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  });
  res.status(201).json({
    statusCode: 200,
    success: true,
    message: 'User logged in successfully!',
    token: accessToken,
    data: user,
  });
});
const changePassword = catchAsync(async (req, res) => {
    console.log(req.user, req.body, "to auth ontroller" )

  const result = await AuthServices.changePasswordIntoDB(
    req.user, req.body
  );
  res.status(201).json({
    statusCode: 200,
    success: true,
    message: 'Password changed successfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.loginIntoDB(
    req.body,
  );

  res.status(201).json({
    statusCode: 200,
    success: true,
    message: 'User logged in successfully!',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await AuthServices.loginIntoDB(
    req.body,
  );

  const user = await User.findOne({ email: req.body.email });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  });
  res.status(201).json({
    statusCode: 200,
    success: true,
    message: 'User logged in successfully!',
    token: accessToken,
    data: user,
  });
});



export const AuthControllers = {
  signup,
  login,
  changePassword,
  forgetPassword, 
  refreshToken
};
