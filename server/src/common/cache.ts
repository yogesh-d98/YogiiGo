import { redis } from "../config/redis";
export async function getOrSetCache<T>(key: string, ttlSec: number, fetcher: () => Promise<T>): Promise<T> {
  const cached = await redis.get(key);
  if (cached) {
     console.log(`Cache hit for key: ${key}`);
    try {
      return JSON.parse(cached) as T;
      
    } catch {
      // fallthrough to fetch fresh if parse fails
    }
  }
   console.log(`Cache miss for key: ${key}`);
  const data = await fetcher();
  await redis.set(key, JSON.stringify(data), { EX: ttlSec });
  return data;
}
