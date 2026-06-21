import { Router } from "express";
import dashboardController from "../controllers/dashboard.controller";

const router = Router();

router.get("/v1/stats", dashboardController.getStats);

export default router;
