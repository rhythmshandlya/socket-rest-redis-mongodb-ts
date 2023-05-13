import { Router, Request, Response } from "express";
import { getRiders } from "./controllers/riders.controller";
const router = Router();

router.use("/nearby-riders", getRiders);

export default router;
