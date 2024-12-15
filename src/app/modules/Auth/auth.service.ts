import config from "../../config";
import AppError from "../../errors/AppError";
import { USER_ROLE } from "../User/user.constant";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import { isPasswordMatched } from "./auth.utils";
import jwt from 'jsonwebtoken'



const signupFromDB = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(403, 'This user already exists');
  }

  payload.role = USER_ROLE.admin;

  const newUser = await User.create(payload);
  return newUser;
};

const loginIntoDB = async (payload: TLoginUser) => {
  const isUser = await User.findOne({ email: payload.email }).select('+password');
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
    phone:isUser.phone,
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



export const AuthServices = {
  signupFromDB,
  loginIntoDB,
 
};
