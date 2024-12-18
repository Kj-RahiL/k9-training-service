import { z } from 'zod';

const productValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    image: z.string(),
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
    description: z.string(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    price: z.number().positive().optional(),
    size: z.array(z.string()).optional(),
    color: z.array(z.string()).optional(),
    stock: z.number().int().nonnegative().optional(),
    description: z.string().optional(),
  }),
});

export const ProductValidation = {
  productValidationSchema,
  updateProductValidationSchema,
};
