import { Router } from "express";
import payrollController from "../controllers/payroll.controller";
import { validateSchema } from "../middlewares/validate.schema";
import {
  generatePayrollSchema,
  payrollSummarySchema,
} from "../schema/payroll";

const router = Router();

router.get(
  "/v1/summary",
  validateSchema(payrollSummarySchema),
  payrollController.getPayrollSummary
);
router.post(
  "/v1/generate-payroll",
  validateSchema(generatePayrollSchema),
  payrollController.generatePayroll
);

export default router;
