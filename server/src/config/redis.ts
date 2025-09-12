import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

export const redis = createClient({ url: redisUrl });

redis.on('connect', () => console.log('✅ Redis connected successfully'));
redis.on('error', (err) => console.error('❌ Redis Client Error:', err));

(async () => {
  if (!redis.isOpen) {
    await redis.connect();
  }
})();
