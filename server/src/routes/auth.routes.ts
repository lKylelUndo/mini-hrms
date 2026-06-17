import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validate.schema";
import { loginSchema } from "../schema/auth";

const router = Router();

router.post("/v1/login", validateSchema(loginSchema), authController.login)

export default router;