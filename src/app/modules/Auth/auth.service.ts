import config from '../../config';
import AppError from '../../errors/AppError';
import { USER_ROLE } from '../User/user.constant';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TChangePassword, TLoginUser } from './auth.interface';
import { isPasswordMatched } from './auth.utils';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendEmail } from '../../utils/sendEmail';

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

const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(400, 'This is user not found');
  }
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const otpExpires = new Date();
  otpExpires.setMinutes(otpExpires.getMinutes() + 5);
  const otpExpiresAt = otpExpires.toISOString();

  console.log(otp, otpExpiresAt);

  user.otp = otp;
  user.otpExpiresAt = otpExpiresAt;
  await user.save();

  await sendEmail(
    user.email,

    `<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
   <table width="100%" style="border-collapse: collapse;">
   <tr>
     <td style="background-color: #FCC734; padding: 20px; text-align: center; color: #000000; border-radius: 10px 10px 0 0;">
       <h2 style="margin: 0; font-size: 24px;">Verify your email</h2>
     </td>
   </tr>
   <tr>
     <td style="padding: 20px;">
       <p style="font-size: 16px; margin: 0;">Hello <strong>${
         user.name
       }</strong>,</p>
       <p style="font-size: 16px;">Please verify your email.</p>
       <div style="text-align: center; margin: 20px 0;">
         <p style="font-size: 18px;" >Verify email using this OTP: <span style="font-weight:bold"> ${otp} </span><br/> This OTP will be Expired in 5 minutes,</p>
       </div>
       <p style="font-size: 14px; color: #555;">If you did not request this change, please ignore this email. No further action is needed.</p>
       <p style="font-size: 16px; margin-top: 20px;">Thank you,<br>DEMOS</p>
     </td>
   </tr>
   <tr>
     <td style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #888; border-radius: 0 0 10px 10px;">
       <p style="margin: 0;">&copy; ${new Date().getFullYear()} DEMOS Team. All rights reserved.</p>
     </td>
   </tr>
   </table>
 </div>

     `,
  );
  return { message: 'OTP sent via your email successfully' };
};

const verifyOtpAndResetPassword = async (
  email: string,
  otp: string,
  password: string,
  newPassword: string,
) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(400, 'User not found');
  }

  if (user?.otp !== otp) {
    throw new AppError(400, 'Your OTP is Invalid!');
  } else if (!user.otpExpiresAt || new Date() > new Date(user.otpExpiresAt)) {
    throw new Error('Your OTP is expired, please send new otp');
  }

  // Validate that the new password matches the confirm password
  if (password !== newPassword) {
    throw new AppError(400, 'New password and password do not match');
  }
  // Update password and clear OTP
  user.password = newPassword;
  user.otp = '';
  user.otpExpiresAt = '';
  await user.save();

  return { message: 'Password reset successfully' };
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email, iat } = decoded;

  // checking user existing
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  // checking if user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(403, 'This user is deleted !');
  }

  // checking user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(403, 'This user is blocked !');
  }
  const isJWTIssuedBeforePasswordChanged = (
    passwordChangeAt: Date,
    iat: number,
  ): boolean => {
    const jwtIssuedTimestamp = iat * 1000;

    if (!passwordChangeAt) return false;

    const passwordTimestamp = new Date(passwordChangeAt).getTime();
    return jwtIssuedTimestamp < passwordTimestamp;
  };

  // Check if the password was changed after the JWT was issued
  if (
    user.passwordChangeAt &&
    isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat as number)
  ) {
    throw new AppError(401, 'You are not authorized!');
  }

  //   create token and sent client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expire_in as string,
  });
  return { accessToken };
};


export const AuthServices = {
  signupFromDB,
  loginIntoDB,
  changePasswordIntoDB,
  forgetPassword,
  verifyOtpAndResetPassword,
  refreshToken
};
