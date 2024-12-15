import config from "../config";
import AppError from "../errors/AppError";
import { USER_ROLE } from "../modules/User/user.constant";
import { User } from "../modules/User/user.model";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";

const Auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token , 'to auth');

    if (!token) {
      throw new AppError(401, "You're not authorized, auth");
    }
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
    const { role, email } = decoded;

    // checking existing user
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(401, "you're not authorized");
    }
      // checking if the user is blocked
      const userStatus = user?.status;

      if (userStatus === 'blocked') {
        throw new AppError(403, 'This user is blocked ! !');
      }

      
    if (!requiredRoles.includes(role)) {
      throw new AppError(401, "You are not authorized to access this route");
    }
    req.user = decoded as JwtPayload;
    console.log(req.user, "to auth");
    next();
  });
};

export default Auth
