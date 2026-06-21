import { mysql } from "../lib/mysql";

export class SalaryRepository {
  async findAll() {
    return await mysql.query(
      `SELECT s.*, e.full_name
       FROM salaries s
       INNER JOIN employees e ON e.id = s.employee_id
       ORDER BY s.id DESC`
    );
  }

  async findByEmployeeId(employeeId: number) {
    return await mysql.query(
      `SELECT s.*, e.full_name
       FROM salaries s
       INNER JOIN employees e ON e.id = s.employee_id
       WHERE s.employee_id = ?`,
      [employeeId]
    );
  }

  async create(data: {
    employeeId: number;
    basicSalary: number;
    allowance: number;
    deductions: number;
    netSalary: number;
  }) {
    return await mysql.query(
      `INSERT INTO salaries (employee_id, basic_salary, allowance, deductions, net_salary)
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.employeeId,
        data.basicSalary,
        data.allowance,
        data.deductions,
        data.netSalary,
      ]
    );
  }

  async update(
    employeeId: number,
    data: {
      basicSalary: number;
      allowance: number;
      deductions: number;
      netSalary: number;
    }
  ) {
    return await mysql.query(
      `UPDATE salaries
       SET basic_salary = ?, allowance = ?, deductions = ?, net_salary = ?
       WHERE employee_id = ?`,
      [
        data.basicSalary,
        data.allowance,
        data.deductions,
        data.netSalary,
        employeeId,
      ]
    );
  }

  async sumActiveEmployeeNetSalary() {
    const result: any = await mysql.query(
      `SELECT COALESCE(SUM(s.net_salary), 0) AS total
       FROM salaries s
       INNER JOIN employees e ON e.id = s.employee_id
       WHERE e.employment_status = 'ACTIVE'`
    );
    return Number(result[0]?.total ?? 0);
  }
}
