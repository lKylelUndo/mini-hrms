import { Router } from "express";
import salaryController from "../controllers/salary.controller";
import { validateSchema } from "../middlewares/validate.schema";
import {
  addSalarySchema,
  updateSalarySchema,
  viewSalarySchema,
} from "../schema/salary";

const router = Router();

router.get("/v1/all-salary", salaryController.getAllSalaries);
router.post(
  "/v1/view-salary",
  validateSchema(viewSalarySchema),
  salaryController.viewSalary
);
router.post(
  "/v1/add-salary",
  validateSchema(addSalarySchema),
  salaryController.addSalary
);
router.put(
  "/v1/update-salary",
  validateSchema(updateSalarySchema),
  salaryController.updateSalary
);

export default router;
