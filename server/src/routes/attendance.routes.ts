import { Router } from "express";
import attendanceController from "../controllers/attendance.controller";
import { validateSchema } from "../middlewares/validate.schema";
import { recordAttendanceSchema } from "../schema/attendance";

const router = Router();

router.get("/v1/all-attendance", attendanceController.getAllAttendance);
router.post(
  "/v1/record-attendance",
  validateSchema(recordAttendanceSchema),
  attendanceController.recordAttendance
);

export default router;
