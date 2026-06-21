import { SalaryRepository } from "../repositories/salary.repository";
import { EmployeeRepository } from "../repositories/employee.repository";
import { computeNetSalary } from "../utils/salary.util";
import { mapSalary } from "../utils/mapper.util";

export class SalaryService {
  private salaryRepository = new SalaryRepository();
  private employeeRepository = new EmployeeRepository();

  public getAllSalaries = async () => {
    try {
      const rows: any = await this.salaryRepository.findAll();
      return {
        status: "success",
        code: 200,
        message: "Salaries fetched successfully",
        salaries: rows.map(mapSalary),
      };
    } catch (error) {
      console.error("SalaryService.getAllSalaries", error);
      return { status: "error", code: 500, message: "Unable to fetch salaries" };
    }
  };

  public viewSalary = async (employeeId: number) => {
    try {
      const rows: any = await this.salaryRepository.findByEmployeeId(employeeId);

      if (!rows?.length) {
        return { status: "error", code: 404, message: "Salary record not found" };
      }

      return {
        status: "success",
        code: 200,
        message: "Salary fetched successfully",
        salary: mapSalary(rows[0]),
      };
    } catch (error) {
      console.error("SalaryService.viewSalary", error);
      return { status: "error", code: 500, message: "Unable to fetch salary" };
    }
  };

  public addSalary = async (data: {
    employeeId: number;
    basicSalary: number;
    allowance: number;
    deductions: number;
  }) => {
    try {
      const employee: any = await this.employeeRepository.findById(data.employeeId);

      if (!employee?.length) {
        return { status: "error", code: 404, message: "Employee not found" };
      }

      const existing: any = await this.salaryRepository.findByEmployeeId(data.employeeId);

      if (existing?.length) {
        return {
          status: "error",
          code: 409,
          message: "Salary already exists for this employee. Use update instead.",
        };
      }

      const netSalary = computeNetSalary(
        data.basicSalary,
        data.allowance,
        data.deductions
      );

      await this.salaryRepository.create({ ...data, netSalary });
      const created: any = await this.salaryRepository.findByEmployeeId(data.employeeId);

      return {
        status: "success",
        code: 201,
        message: "Salary added successfully",
        salary: mapSalary(created[0]),
      };
    } catch (error) {
      console.error("SalaryService.addSalary", error);
      return { status: "error", code: 500, message: "Unable to add salary" };
    }
  };

  public updateSalary = async (data: {
    employeeId: number;
    basicSalary: number;
    allowance: number;
    deductions: number;
  }) => {
    try {
      const existing: any = await this.salaryRepository.findByEmployeeId(data.employeeId);

      if (!existing?.length) {
        return { status: "error", code: 404, message: "Salary record not found" };
      }

      const netSalary = computeNetSalary(
        data.basicSalary,
        data.allowance,
        data.deductions
      );

      await this.salaryRepository.update(data.employeeId, {
        basicSalary: data.basicSalary,
        allowance: data.allowance,
        deductions: data.deductions,
        netSalary,
      });

      const updated: any = await this.salaryRepository.findByEmployeeId(data.employeeId);

      return {
        status: "success",
        code: 200,
        message: "Salary updated successfully",
        salary: mapSalary(updated[0]),
      };
    } catch (error) {
      console.error("SalaryService.updateSalary", error);
      return { status: "error", code: 500, message: "Unable to update salary" };
    }
  };
}
