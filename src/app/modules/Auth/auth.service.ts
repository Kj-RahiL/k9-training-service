import config from '../../config';
import AppError from '../../errors/AppError';
import { USER_ROLE } from '../User/user.constant';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TChangePassword, TLoginUser } from './auth.interface';
import { isPasswordMatched } from './auth.utils';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const signupFromDB = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(403, 'This user already exists');
  }

  payload.role = USER_ROLE.user;

  const newUser = await User.create(payload);
  return newUser;
};

const loginIntoDB = async (payload: TLoginUser) => {
  const isUser = await User.findOne({ email: payload.email }).select(
    '+password',
  );
  if (!isUser) {
    throw new AppError(404, 'User not found');
  }
  const passwordMatch = await isPasswordMatched(
    payload.password,
    isUser.password,
  );
  if (!passwordMatch) {
    throw new AppError(404, "Password doesn't match !");
  }

  const jwtPayload = {
    id: isUser.id,
    name: isUser.name,
    email: isUser.email,
    phone: isUser.phone,
    address: isUser.address,
    role: isUser.role,
    status: isUser.status,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_refresh_expire_in,
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    { expiresIn: config.jwt_refresh_expire_in },
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  const user = await User.findOne({ email: userData.email }).select(
    '+password',
  );
  if (!user) throw new AppError(404, 'User not found');

  // Matching existing password
  const passwordMatch = await isPasswordMatched(
    payload.existingPassword,
    user.password,
  );
  console.log('Password Match Result:', passwordMatch);

  if (!passwordMatch) {
    throw new AppError(403, "Password doesn't match!");
  }

  // Validate that the new password matches the confirm password
  if (payload.newPassword !== payload.confirmPassword) {
    throw new AppError(400, 'New password and confirm password do not match');
  }

  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    { _id: user._id },
    {
      password: newHashPassword,
      passwordChangeAt: new Date(),
    },
  );

  return user;
};

export const AuthServices = {
  signupFromDB,
  loginIntoDB,
  changePasswordIntoDB,
};
