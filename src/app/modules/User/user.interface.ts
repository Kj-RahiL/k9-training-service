export type TUser = {
  name: string;
  email: string;
  image: string;
  phone: string;
  address: string;
  password: string;
  role: 'admin' | 'trainer' | 'user';
  passwordChangeAt?: Date;
  status: 'active' | 'blocked';
  otp: string;
  otpExpiresAt: string;
  isDeleted: boolean;
};
