import { z } from 'zod';

export const createStoreSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    address: z.string().optional(),
    phone: z.string().optional(),
    isOpen: z.boolean().optional(),
    // geo: client can send as { lat, lng } or we accept coordinates array
    geo: z
      .object({ lat: z.number(), lng: z.number() })
      .optional(),
    // avatarUrl: z.string().url().optional()
  })
});

export const updateStoreSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    isOpen: z.boolean().optional(),
    geo: z
      .object({ lat: z.number(), lng: z.number() })
      .optional(),
    avatarUrl: z.string().url().optional()
  }),
  params: z.object({ id: z.string().min(1) })
});

export const listStoresSchema = z.object({
  query: z.object({
    lat: z.preprocess((v) => (v ? Number(v) : undefined), z.number().optional()),
    lng: z.preprocess((v) => (v ? Number(v) : undefined), z.number().optional()),
    radiusKm: z.preprocess((v) => (v ? Number(v) : 5), z.number().optional()),
    page: z.preprocess((v) => (v ? Number(v) : 1), z.number().optional()),
    limit: z.preprocess((v) => (v ? Number(v) : 20), z.number().optional())
  })
});
