import * as socketio from "socket.io";
import { Server } from "socket.io";
import { RedisClient } from "redis";
import { Server as HttpServer } from "http";
import { SocketEvent } from "../common/constants";
import { setRiderLocation } from "./RedisServer";

class SocketServer {
  private _io: socketio.Server;

  constructor(server: HttpServer, redis: RedisClient) {
    this._io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    this.listen();
  }

  private listen(): void {
    this._io.on("connection", (socket: any) => {
      socket.on(
        SocketEvent.SAVE_RIDER_LOCATION,
        async (data: {
          riderId: string;
          point: {
            latitude: number;
            longitude: number;
          };
        }) => {
          console.log(data);
          setRiderLocation(data.riderId, data.point);
        }
      );
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }

  public close(): void {
    this._io.close();
    console.info(new Date(), "[SocketServer]: Disconnect");
  }
}

export default SocketServer;
