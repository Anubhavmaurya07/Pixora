const Redis = require("ioredis");

require("dotenv").config();

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("❌ REDIS_URL is missing from .env");
}

const useTLS = redisUrl.startsWith("rediss://");

const redis = new Redis(redisUrl, {
  tls: useTLS ? {} : undefined,
  maxRetriesPerRequest: null, 
  enableReadyCheck: false,    
});

redis.on("connect", () => console.log("✅ Connected to Redis"));
redis.on("error", (err) => console.error("❌ Redis error:", err.message));

module.exports = { redis };