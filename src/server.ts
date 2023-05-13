import config from "./common/config";
import { app, connectMongoServer, SocketServer, redisClient } from "./loaders";
import * as http from "http";

const startServer = () => {
  //start mongo server
  connectMongoServer();

  //redis client
  const redis = redisClient;

  // start express
  const server = http.createServer(app);

  const socket = new SocketServer(server, redis);

  server.listen(config.serverPort, () => {
    console.log(`Server listening on port ${config.serverPort}`);
  });
};

startServer();
