import { model, Schema } from 'mongoose';
import { TService } from './service.interface';

const serviceSchema = new Schema<TService>(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      unique: true,
    },
    image: {
      type: String,
      required: [true, 'image link is required'],
    },
    description: {
      type: String,
      required: [true, 'description link is required'],
    },
  },
  {
    timestamps: true,
  },
);

export const Service = model<TService>('Service', serviceSchema);
