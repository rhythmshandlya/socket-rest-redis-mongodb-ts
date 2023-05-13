import * as socketio from "socket.io";
import { Server } from "socket.io";
import { RedisClient } from "redis";
import { Server as HttpServer } from "http";

class SocketServer {
  private _io: socketio.Server;
  private _redis: RedisClient;

  constructor(server: HttpServer, redis: RedisClient) {
    this._io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    this._redis = redis;
    this.listen();
  }

  private listen(): void {
    this._io.on("connection", (socket: any) => {
      socket.on("disconnect", () => {});
    });
  }

  public close(): void {
    this._io.close();
    console.info(new Date(), "[SocketServer]: Disconnect");
  }
}

export default SocketServer;
