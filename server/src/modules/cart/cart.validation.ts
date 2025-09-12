import { z } from 'zod';

export const addItemSchema = z.object({
  body: z.object({
    productId: z.string().min(1),
    qty: z.coerce.number().int().min(1).default(1)
  })
});

export const updateItemSchema = z.object({
  body: z.object({
    productId: z.string().min(1),
    qty: z.coerce.number().int().min(0) // qty = 0 means remove item
  })
});
