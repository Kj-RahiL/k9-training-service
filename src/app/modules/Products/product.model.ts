import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    size: {
        type: String,
        enum: {
          values: ['S', 'M', 'L', 'XL', 'XXL'],
          message: '{VALUE} is not a valid size',
        },
        required: [true, 'size is required'],
    },
    color: {
      type: String,
      enum: {
        values: ['black', 'white', 'green', 'orange'],
        message: '{VALUE} is not a valid color',
      },
      required: [true, "color is required"],
    },
    quantity: {
      type: Number,
      required: [true, "number is required"],
    },
    description: {
      type: String,
      required: [true, "description link is required"]
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model<TProduct>("Product", productSchema);
