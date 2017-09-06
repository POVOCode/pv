import Redis from "redis";
import Logger from "./logger";
import ENV from "./env";

const client = Redis.createClient({
  host: ENV.REDIS_HOST,
  port: ENV.REDIS_PORT,
  db: ENV.REDIS_DB,
});

client.on("ready", () => {
  Logger.info(`Connected to redis at ${ENV.REDIS_HOST}:${ENV.REDIS_PORT}`);
});

client.on("error", (err) => {
  Logger.error(`Redis error: ${err}`);
});

export default client;
