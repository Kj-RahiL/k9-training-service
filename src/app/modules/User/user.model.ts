import { model, Schema } from 'mongoose';

import bcrypt from 'bcrypt';
import config from '../../config';
import { TUser } from './user.interface';
import { USER_ROLE, USER_STATUS } from './user.constant';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: [true, 'name is required'] },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    phone:{
      type: String
    },
    address:{
      type: String
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      select: 0,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: Object.keys(USER_ROLE),
      default: USER_ROLE.user,
    },
    passwordChangeAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: Object.keys(USER_STATUS),
      default: USER_STATUS.active,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);


// query middleware
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('save', async function (next) {
  const user = this;

  // Only hash the password if it is being modified
  if (!user.isModified('password')) {
    return next();
  }

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
})

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);