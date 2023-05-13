import { Request, Response } from "express";

const healthCheck = (req: Request, res: Response) => {
  res.status(200).send("OK");
};

export { healthCheck };
