import { model, Schema, Types } from "mongoose";
import { TOrder } from "./order.interface";
import AppError from "../../errors/AppError";

const orderSchema = new Schema<TOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      required: [ true, 'product id required'],
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    totalPrice: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

// Pre-save hook to calculate totalPrice dynamically
orderSchema.pre("save", async function (next) {
  const product = await model("Product").findById(this.product);
  if (!product) {
    throw new AppError(404, "Product not found.");
  }
  this.totalPrice = this.quantity * product.price; 
  next();
});


export const Order = model<TOrder>("Order", orderSchema);
