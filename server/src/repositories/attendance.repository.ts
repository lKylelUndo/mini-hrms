import { mysql } from "../lib/mysql";

export class AttendanceRepository {
  async findAll() {
    return await mysql.query(
      `SELECT a.*, e.full_name
       FROM attendance a
       INNER JOIN employees e ON e.id = a.employee_id
       ORDER BY a.date DESC, a.id DESC`
    );
  }

  async create(data: {
    employeeId: number;
    date: string;
    timeIn: string | null;
    timeOut: string | null;
    status: string;
  }) {
    return await mysql.query(
      `INSERT INTO attendance (employee_id, date, time_in, time_out, status)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE time_in = VALUES(time_in), time_out = VALUES(time_out), status = VALUES(status)`,
      [data.employeeId, data.date, data.timeIn, data.timeOut, data.status]
    );
  }
}
