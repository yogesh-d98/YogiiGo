import { redis } from "../config/redis";
export async function getOrSetCache<T>(key: string, ttlSec: number, fetcher: () => Promise<T>): Promise<T> {
  const cached = await redis.get(key);
  if (cached) {
    try {
      return JSON.parse(cached) as T;
    } catch {
      // fallthrough to fetch fresh if parse fails
    }
  }
  const data = await fetcher();
  await redis.set(key, JSON.stringify(data), { EX: ttlSec });
  return data;
}
