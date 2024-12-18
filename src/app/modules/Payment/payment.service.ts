import config from '../../config';
import Stripe from 'stripe';
import { Product } from '../Products/product.model';
import AppError from '../../errors/AppError';

const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: '2024-11-20.acacia',
});

const checkOutIntoDB = async (items: { productId: string; quantity: number }[]) => {

  const lineItems = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new AppError(404, `Product not found: ${item.productId}`);
      }

      // Create a line item for Stripe Checkout
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
            images: [product.image], // Add the product image if available
          },
          unit_amount: Math.round(product.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    })
  );

  // Create a Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    metadata: { orderDetails: JSON.stringify(items) },
    mode: "payment",
    success_url: `${config.base_url}/success`,
    cancel_url: `${config.base_url}/cancel`,
  });

  return session;
};
export const PaymentService = {
  checkOutIntoDB,
};
