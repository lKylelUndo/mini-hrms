import { Router } from "express";
import authRoutes from  "./auth.routes"
import employeeRoutes from  "./employee.routes"

const router = Router();

router.use("/auth", authRoutes)
router.use("/employee", employeeRoutes)

export default router;