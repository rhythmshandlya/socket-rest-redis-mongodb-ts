import { RedisClient } from "redis";
import config from "../common/config";

import * as redis from "redis";

// Create a Redis instance
let client = redis.createClient(config.redisURI);

export function disconnectRedis() {
  client.quit();
}

// Function to set a rider location in Redis
export function setRiderLocation(
  riderId: string,
  point: {
    latitude: number;
    longitude: number;
  }
) {
  console.log("Setting rider location", riderId, point);
  // Set the geo-spatial value
  client.geoadd("riders", [point.latitude, point.longitude, riderId]);
}

export type RiderLocation = Array<{
  id: string;
  location: { latitude: number; longitude: number };
}>;

// Function to get all the riders within a radius of a point in Redis
export async function getRidersWithinRadius(point: {
  latitude: number;
  longitude: number;
}): Promise<any> {
  // Get the latitude and longitude of the point
  const latitude = point.latitude;
  const longitude = point.longitude;

  const radius = 5000; // meters

  const nearbyRiders = await client.georadius(
    "riders",
    latitude,
    longitude,
    radius,
    "m",
    (err, res) => {
      console.log(res);
    }
  );
  return nearbyRiders;
}

export default client;
