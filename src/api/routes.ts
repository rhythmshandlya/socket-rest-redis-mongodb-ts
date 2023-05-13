import { Router, Request, Response } from "express";
import { healthCheck } from "./controllers/test.controller";
import { getRiders } from "./controllers/riders.controller";
const router = Router();

router.use("/test", healthCheck);
router.use("/nearby-riders", getRiders);

export default router;
