import { mysql } from "../lib/mysql";

export class PayrollRepository {
  async findAll(month?: number, year?: number) {
    let query = `SELECT p.*, e.full_name
       FROM payroll p
       INNER JOIN employees e ON e.id = p.employee_id`;
    const params: number[] = [];

    if (month && year) {
      query += ` WHERE MONTH(p.payroll_date) = ? AND YEAR(p.payroll_date) = ?`;
      params.push(month, year);
    }

    query += ` ORDER BY p.payroll_date DESC, p.id DESC`;
    return await mysql.query(query, params);
  }

  async existsForMonth(month: number, year: number) {
    const result: any = await mysql.query(
      `SELECT COUNT(*) AS total FROM payroll
       WHERE MONTH(payroll_date) = ? AND YEAR(payroll_date) = ?`,
      [month, year]
    );
    return Number(result[0]?.total ?? 0) > 0;
  }

  async generateForMonth(month: number, year: number, payrollDate: string) {
    return await mysql.query(
      `INSERT INTO payroll (employee_id, basic_salary, allowance, deductions, net_salary, payroll_date)
       SELECT s.employee_id, s.basic_salary, s.allowance, s.deductions, s.net_salary, ?
       FROM salaries s
       INNER JOIN employees e ON e.id = s.employee_id
       WHERE e.employment_status = 'ACTIVE'`,
      [payrollDate]
    );
  }

  async sumMonthlyPayroll(month: number, year: number) {
    const result: any = await mysql.query(
      `SELECT COALESCE(SUM(net_salary), 0) AS total
       FROM payroll
       WHERE MONTH(payroll_date) = ? AND YEAR(payroll_date) = ?`,
      [month, year]
    );
    return Number(result[0]?.total ?? 0);
  }
}
