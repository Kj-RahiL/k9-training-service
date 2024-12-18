import { model, Schema } from 'mongoose';
import AppError from '../../errors/AppError';
import { TCart } from './cart.interface';

const orderSchema = new Schema<TCart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    product: {
      type: Schema.Types.ObjectId,
      required: [true, 'Product id required'],
      ref: 'Product',
    },
    size: {
      type: String,
      required: [true, 'Size is required'],
    },
    color: {
      type: String,
      required: [true, 'Color is required'],
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true },
);

// Pre-save hook to calculate totalPrice dynamically
orderSchema.pre('save', async function (next) {
  const product = await model('Product').findById(this.product);
  if (!product) {
    throw new AppError(404, 'Product not found.');
  }
  this.totalPrice = this.quantity * product.price;
  next();
});

export const Cart = model<TCart>('Cart', orderSchema);
