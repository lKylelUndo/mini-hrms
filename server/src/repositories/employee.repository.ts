import { mysql } from "../lib/mysql";

export class EmployeeRepository {
  async findAll() {
    return await mysql.query(
      `SELECT * FROM employees ORDER BY id DESC`
    );
  }

  async findById(id: number) {
    return await mysql.query(`SELECT * FROM employees WHERE id = ?`, [id]);
  }

  async findByStatus(status: string) {
    return await mysql.query(
      `SELECT * FROM employees WHERE employment_status = ? ORDER BY id DESC`,
      [status]
    );
  }

  async countAll() {
    const result: any = await mysql.query(
      `SELECT COUNT(*) AS total FROM employees`
    );
    return result[0]?.total ?? 0;
  }

  async countByStatus(status: string) {
    const result: any = await mysql.query(
      `SELECT COUNT(*) AS total FROM employees WHERE employment_status = ?`,
      [status]
    );
    return result[0]?.total ?? 0;
  }

  async create(data: {
    fullName: string;
    email: string;
    contactNumber: string;
    position: string;
    department: string;
    dateHired: Date;
    employmentStatus: string;
  }) {
    return await mysql.query(
      `INSERT INTO employees (full_name, email, contact_number, position, department, date_hired, employment_status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.fullName,
        data.email,
        data.contactNumber,
        data.position,
        data.department,
        data.dateHired,
        data.employmentStatus,
      ]
    );
  }

  async update(
    id: number,
    data: Partial<{
      fullName: string;
      email: string;
      contactNumber: string;
      position: string;
      department: string;
      dateHired: Date;
      employmentStatus: string;
    }>
  ) {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (data.fullName !== undefined) {
      fields.push("full_name = ?");
      values.push(data.fullName);
    }
    if (data.email !== undefined) {
      fields.push("email = ?");
      values.push(data.email);
    }
    if (data.contactNumber !== undefined) {
      fields.push("contact_number = ?");
      values.push(data.contactNumber);
    }
    if (data.position !== undefined) {
      fields.push("position = ?");
      values.push(data.position);
    }
    if (data.department !== undefined) {
      fields.push("department = ?");
      values.push(data.department);
    }
    if (data.dateHired !== undefined) {
      fields.push("date_hired = ?");
      values.push(data.dateHired);
    }
    if (data.employmentStatus !== undefined) {
      fields.push("employment_status = ?");
      values.push(data.employmentStatus);
    }

    if (fields.length === 0) return null;

    values.push(id);
    return await mysql.query(
      `UPDATE employees SET ${fields.join(", ")} WHERE id = ?`,
      values
    );
  }

  async delete(id: number) {
    return await mysql.query(`DELETE FROM employees WHERE id = ?`, [id]);
  }
}
