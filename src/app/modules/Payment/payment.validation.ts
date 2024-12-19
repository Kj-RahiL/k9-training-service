import { z } from 'zod';

const OrderItemSchema = z.object({
    productId: z.string().nonempty("Product ID is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    size: z.string().optional(),
    color: z.string().optional(),
});

export const OrderDataSchema = z.object({
    body: z.object({
        items: z
        .array(OrderItemSchema, { required_error: "Items array is required" })
        .nonempty("Items cannot be an empty array"),
    })
});
