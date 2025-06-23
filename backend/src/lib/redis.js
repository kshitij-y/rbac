const { createClient } = require("redis");
const dotenv = require("dotenv");
dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Client Error:", err);
});

(async () => {
  try {
    if (!redisClient.isOpen) await redisClient.connect();
    console.log("✅ Redis client connected");
  } catch (err) {
    console.error("❌ Failed to connect to Redis:", err);
  }
})();

module.exports = {
  redisClient,
};
