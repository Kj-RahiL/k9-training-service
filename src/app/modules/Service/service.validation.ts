import { z } from 'zod';

const serviceValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    image: z.string(),
    description: z.string(),
  }),
});

const updateServiceValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const ServiceValidation = {
  serviceValidationSchema,
  updateServiceValidationSchema,
};
