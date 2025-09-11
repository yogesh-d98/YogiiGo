// src/modules/product/product.validation.ts
import { z } from "zod";

export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        description: z.string().optional(),
        price: z.coerce.number().positive(),
        stock: z.coerce.number().min(0),
        storeId: z.string().min(1),
        categoryId: z.string().min(1)
    })
});

export const updateProductSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.coerce.number().positive(),   // <--- auto convert "60" → 60
        stock: z.coerce.number().min(0),
        categoryId: z.string().optional(),
        isActive: z.boolean().optional()
    })
});
