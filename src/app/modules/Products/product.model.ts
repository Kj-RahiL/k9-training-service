import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      unique: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      unique: false,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    sizes: {
      type: [String],
      default: ["S", "M", "L", "XL", "XXL"],
    },
    colors: {
      type: [String],
      default: ["black", "white", "green", "orange"],
    },
    stock: {
      type: Number,
      required: [true, "number is required"],
    },
    description: {
      type: String,
      required: [true, "description link is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model<TProduct>("Product", productSchema);
