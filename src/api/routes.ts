import { Router, Request, Response } from "express";
import { healthCheck } from "./controllers/test.controller";
const router = Router();

router.use("/test", healthCheck);

export default router;
