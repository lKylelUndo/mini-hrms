import { Request, Response } from "express";
import { AttendanceService } from "../services/attendance.service";

class AttendanceController {
  private attendanceService = new AttendanceService();

  public getAllAttendance = async (_req: Request, res: Response) => {
    const response = await this.attendanceService.getAllAttendance();
    return res.status(response.code).json(response);
  };

  public recordAttendance = async (req: Request, res: Response) => {
    const response = await this.attendanceService.recordAttendance(req.body);
    return res.status(response.code).json(response);
  };
}

export default new AttendanceController();
