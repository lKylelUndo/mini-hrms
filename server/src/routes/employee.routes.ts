import { Router } from "express";
import employeeController from "../controllers/employee.controller";
import { validateSchema } from "../middlewares/validate.schema";
import { addEmployeeSchema, deleteEmployeeSchema, editEmployeeSchema, viewEmployeeSchema } from "../schema/employee";

const router = Router();

router.get("/v1/all-employee", employeeController.getAllEmployees);
router.post("/v1/view-employee", validateSchema(viewEmployeeSchema), employeeController.viewEmployee);
router.post("/v1/add-employee", validateSchema(addEmployeeSchema), employeeController.addEmployee);
router.put("/v1/edit-employee", validateSchema(editEmployeeSchema), employeeController.editEmployee);
router.delete("/v1/delete-employee", validateSchema(deleteEmployeeSchema), employeeController.deleteEmployee)

export default router;