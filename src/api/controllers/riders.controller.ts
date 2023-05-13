import { Request, Response } from "express";
import { getRidersWithinRadius } from "../../loaders/RedisServer";
import httpStatus = require("http-status");

const getRiders = async (req: Request, res: Response) => {
  const result = await getRidersWithinRadius(req.body.point);
  res.status(httpStatus.OK).json({
    riders: result,
  });
};

export { getRiders };
