export const mapEmployee = (row: Record<string, unknown>) => ({
  id: row.id,
  fullName: row.full_name,
  email: row.email,
  contactNumber: row.contact_number,
  position: row.position,
  department: row.department,
  dateHired: row.date_hired,
  employmentStatus: row.employment_status,
});

export const mapSalary = (row: Record<string, unknown>) => ({
  id: row.id,
  employeeId: row.employee_id,
  employeeName: row.full_name ?? row.employee_name,
  basicSalary: Number(row.basic_salary),
  allowance: Number(row.allowance),
  deductions: Number(row.deductions),
  netSalary: Number(row.net_salary),
});

export const mapAttendance = (row: Record<string, unknown>) => ({
  id: row.id,
  employeeId: row.employee_id,
  employeeName: row.full_name ?? row.employee_name,
  date: row.date,
  timeIn: row.time_in,
  timeOut: row.time_out,
  status: row.status,
});

export const mapPayroll = (row: Record<string, unknown>) => ({
  id: row.id,
  employeeId: row.employee_id,
  employeeName: row.full_name ?? row.employee_name,
  basicSalary: Number(row.basic_salary),
  allowance: Number(row.allowance),
  deductions: Number(row.deductions),
  netSalary: Number(row.net_salary),
  payrollDate: row.payroll_date,
});

export const mapUser = (row: Record<string, unknown>) => ({
  id: row.id,
  email: row.email,
});
