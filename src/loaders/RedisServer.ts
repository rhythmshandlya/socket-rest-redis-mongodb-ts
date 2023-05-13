import { RedisClient } from "redis";
import config from "../common/config";

const redis = require("redis");

// Create a Redis instance
let client = redis.createClient(config.redisURI);

export function disconnectRedis() {
  client.quit();
}

// Function to set a rider location in Redis
export function setRiderLocation(
  riderId: string,
  latitude: number,
  longitude: number
) {
  // Create a geo-spatial key
  const key = `rider_location:${riderId}`;

  // Set the geo-spatial value
  client.geoadd(key, latitude, longitude);
}

export type RiderLocation = Array<{
  id: string;
  location: { latitude: number; longitude: number };
}>;

// Function to get all the riders within a radius of a point in Redis
export function getRidersWithinRadius(
  point: { latitude: number; longitude: number },
  radius: number
): RiderLocation {
  // Get the latitude and longitude of the point
  const lat = point.latitude;
  const lon = point.longitude;

  // Get all the riders within the radius of the point
  const riders = client.georadius("rider_location", lat, lon, radius, {
    unit: "km",
    withdist: true,
    withcoord: true,
  });

  // Return the array of riders
  return riders;
}

export default client;
