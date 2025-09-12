import { z } from 'zod';

export const placeOrderSchema = z.object({
  body: z.object({
    address: z.string().min(5),
    phone: z.string().optional(),
    paymentMethod: z.string().optional()
  })
});
