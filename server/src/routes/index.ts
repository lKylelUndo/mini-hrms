import { Router } from "express";
import authRoutes from "./auth.routes";
import employeeRoutes from "./employee.routes";
import salaryRoutes from "./salary.routes";
import attendanceRoutes from "./attendance.routes";
import payrollRoutes from "./payroll.routes";
import dashboardRoutes from "./dashboard.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/employee", employeeRoutes);
router.use("/salary", salaryRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/payroll", payrollRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
