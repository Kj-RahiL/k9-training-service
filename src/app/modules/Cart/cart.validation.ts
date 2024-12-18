import { z } from 'zod';

const CartValidationSchema = z.object({
  body: z.object({
    product: z.string(),
    size: z.string(),
    color: z.string(),
    quantity: z.number().int().nonnegative(),
  }),
});

const updateCartValidationSchema = z.object({
  body: z.object({
    size: z.string().optional(),
    color: z.number().positive().optional(),
    quantity: z.number().int().nonnegative().optional(),
  }),
});

export const CartValidation = {
  CartValidationSchema,
  updateCartValidationSchema,
};
