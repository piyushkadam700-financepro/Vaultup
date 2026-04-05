import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const COUNT_KEY = 'vaultup_signups';
const MIN_DISPLAY = 10;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'POST') {
      const count = await redis.incr(COUNT_KEY);
      return res.json({ count, show: count >= MIN_DISPLAY });
    }
    const count = (await redis.get(COUNT_KEY)) || 0;
    return res.json({ count, show: count >= MIN_DISPLAY });
  } catch (e) {
    return res.json({ count: 0, show: false });
  }
}
