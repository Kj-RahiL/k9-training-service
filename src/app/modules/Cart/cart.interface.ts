import { Types } from 'mongoose';

export type TCart = {
  user?: Types.ObjectId;
  product: Types.ObjectId;
  size: string;
  color: string;
  quantity: number;
  totalPrice?: number;
  paymentStatus?: 'pending' | 'paid' | 'canceled';
};
