import { mysql } from "../lib/mysql";

export class DashboardRepository {
  async getEmployeeCounts() {
    const result: any = await mysql.query(
      `SELECT
         COUNT(*) AS totalEmployees,
         SUM(CASE WHEN employment_status = 'ACTIVE' THEN 1 ELSE 0 END) AS activeEmployees,
         SUM(CASE WHEN employment_status = 'ON LEAVE' THEN 1 ELSE 0 END) AS onLeaveEmployees
       FROM employees`
    );
    return result[0];
  }

  async getMonthlyPayrollTotal(month: number, year: number) {
    const result: any = await mysql.query(
      `SELECT COALESCE(SUM(net_salary), 0) AS total
       FROM payroll
       WHERE MONTH(payroll_date) = ? AND YEAR(payroll_date) = ?`,
      [month, year]
    );
    return Number(result[0]?.total ?? 0);
  }

  async getActiveSalaryTotal() {
    const result: any = await mysql.query(
      `SELECT COALESCE(SUM(s.net_salary), 0) AS total
       FROM salaries s
       INNER JOIN employees e ON e.id = s.employee_id
       WHERE e.employment_status = 'ACTIVE'`
    );
    return Number(result[0]?.total ?? 0);
  }
}
