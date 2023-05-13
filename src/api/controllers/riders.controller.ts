import { Request, Response } from "express";
import { getRidersWithinRadius } from "../../loaders/RedisServer";
import httpStatus = require("http-status");

const getRiders = async (req: Request, res: Response) => {
  getRidersWithinRadius(req.body.point, (err: any, result: any) => {
    if (err) {
      res.status(httpStatus.NOT_FOUND).send(err);
    }
    res.status(httpStatus.OK).json({
      riders: result,
    });
  });
};

export { getRiders };
