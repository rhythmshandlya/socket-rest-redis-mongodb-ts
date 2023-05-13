import { Router, Request, Response } from "express";
import { getNearByRiders } from "../api/modules/rider/rider.controller";
const router = Router();

router.use("/nearby-riders", getNearByRiders);

export default router;
