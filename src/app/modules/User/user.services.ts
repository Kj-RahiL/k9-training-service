import AppError from '../../errors/AppError';
import { USER_ROLE } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

const createAdminIntoDB = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email });

  payload.role = USER_ROLE.admin;
  if (user) {
    const admin = await User.findByIdAndUpdate(user._id, payload);
    return admin;
  }

  const admin = await User.create(payload);
  return admin;
};

const createTrainerIntoDB = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email });
  payload.role = USER_ROLE.trainer;
  if (user) {
    const trainer = await User.findByIdAndUpdate(user._id, payload);
    return trainer;
  }

  const trainer = await User.create(payload);
  return trainer;
};

const getAllUser = async () => {
  const result = await User.find();
  return result;
};

const getUserFromDB = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, 'User Not found.');
  }
  if (user.status === 'blocked') {
    throw new AppError(400, 'Cannot get user');
  }
  return user;
};

const getMeFromDB = async (id: string) => {
  console.log(id)
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, 'User Not found.');
  }
  if (user.status === 'blocked') {
    throw new AppError(400, 'Cannot get user');
  }
  return user;
};

const updateUserIntoDB = async (id: string, payload: TUser) => {
  const isUser = await User.findById(id);

  console.log(isUser);

  if (!isUser) {
    throw new AppError(404, 'user not found');
  }
  const user = await User.findByIdAndUpdate(id, [{ $set: payload }], {
    new: true,
  });
  return user;
};
const deleteUserIntoDB = async (id: string) => {
  const isUser = await User.findById(id);
  if (!isUser) {
    throw new AppError(404, 'user not found');
  }
  const user = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return user;
};

export const UserServices = {
  createAdminIntoDB,
  createTrainerIntoDB,
  getUserFromDB,
  getAllUser,
  getMeFromDB,
  updateUserIntoDB,
  deleteUserIntoDB,
};
