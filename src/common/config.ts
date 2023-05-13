import * as dotenv from "dotenv";
import { resolve } from "path";

// environment file error should crash whole process
const ENV_FILE_PATH = resolve(".env");
const isEnvFound = dotenv.config({ path: ENV_FILE_PATH });
if (isEnvFound.error) {
  throw new Error("Cannot find .env file.");
}

// Assign default value for each environments
process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.SERVER_PORT = process.env.SERVER_PORT || "8080";
process.env.REDIS_PORT = process.env.REDIS_PORT || "6379";
process.env.REDIS_HOST = process.env.REDIS_HOST || "redis";
process.env.SAMPLE_PLATFORM_PUBLIC_KEY =
  process.env.SAMPLE_PLATFORM_PUBLIC_KEY || "123123";
process.env.MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/delivery";
process.env.REDIS_URI = process.env.REDIS_URL || "redis://redis:6379";

export default {
  env: process.env.NODE_ENV,
  // express server port
  serverPort: parseInt(process.env.SERVER_PORT, 10),

  // redis port
  redisURI: process.env.REDIS_URI,

  // mongo database uri
  mongoURI: process.env.MONGODB_URI,

  // json web token audiences
  samplePlatformAudience: process.env.SAMPLE_PLATFORM_AUDIENCE,
  samplePlatformPublicKey: process.env.SAMPLE_PLATFORM_PUBLIC_KEY,
};
