import { AttendanceRepository } from "../repositories/attendance.repository";
import { EmployeeRepository } from "../repositories/employee.repository";
import { mapAttendance } from "../utils/mapper.util";

export class AttendanceService {
  private attendanceRepository = new AttendanceRepository();
  private employeeRepository = new EmployeeRepository();

  public getAllAttendance = async () => {
    try {
      const rows: any = await this.attendanceRepository.findAll();
      return {
        status: "success",
        code: 200,
        message: "Attendance records fetched successfully",
        attendance: rows.map(mapAttendance),
      };
    } catch (error) {
      console.error("AttendanceService.getAllAttendance", error);
      return {
        status: "error",
        code: 500,
        message: "Unable to fetch attendance records",
      };
    }
  };

  public recordAttendance = async (data: {
    employeeId: number;
    date: string;
    timeIn: string | null;
    timeOut: string | null;
    status: string;
  }) => {
    try {
      const employee: any = await this.employeeRepository.findById(data.employeeId);

      if (!employee?.length) {
        return { status: "error", code: 404, message: "Employee not found" };
      }

      await this.attendanceRepository.create(data);
      const rows: any = await this.attendanceRepository.findAll();
      const record = rows.find(
        (row: any) =>
          row.employee_id === data.employeeId && row.date === data.date
      );

      return {
        status: "success",
        code: 201,
        message: "Attendance recorded successfully",
        attendance: record ? mapAttendance(record) : null,
      };
    } catch (error) {
      console.error("AttendanceService.recordAttendance", error);
      return {
        status: "error",
        code: 500,
        message: "Unable to record attendance",
      };
    }
  };
}
