

export type TUser = {
  name: string;
  email: string;
  phone:string
  address:string
  password: string;
  role: 'admin' | 'trainer' | 'user' ;
  passwordChangeAt?: Date;
  status: 'active' | 'blocked';
  isDeleted: boolean;
};