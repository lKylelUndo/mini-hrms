import { EmployeeRepository } from "../repositories/employee.repository";
import { mapEmployee } from "../utils/mapper.util";

export class EmployeeService {
  private employeeRepository = new EmployeeRepository();

  public getAllEmployees = async () => {
    try {
      const rows: any = await this.employeeRepository.findAll();
      return {
        status: "success",
        code: 200,
        message: "Employees fetched successfully",
        employees: rows.map(mapEmployee),
      };
    } catch (error) {
      console.error("EmployeeService.getAllEmployees", error);
      return { status: "error", code: 500, message: "Unable to fetch employees" };
    }
  };

  public getActiveEmployees = async () => {
    try {
      const rows: any = await this.employeeRepository.findByStatus("ACTIVE");
      return {
        status: "success",
        code: 200,
        message: "Active employees fetched successfully",
        employees: rows.map(mapEmployee),
      };
    } catch (error) {
      console.error("EmployeeService.getActiveEmployees", error);
      return {
        status: "error",
        code: 500,
        message: "Unable to fetch active employees",
      };
    }
  };

  public getOnLeaveEmployees = async () => {
    try {
      const rows: any = await this.employeeRepository.findByStatus("ON LEAVE");
      return {
        status: "success",
        code: 200,
        message: "Employees on leave fetched successfully",
        employees: rows.map(mapEmployee),
      };
    } catch (error) {
      console.error("EmployeeService.getOnLeaveEmployees", error);
      return {
        status: "error",
        code: 500,
        message: "Unable to fetch employees on leave",
      };
    }
  };

  public viewEmployee = async (id: number) => {
    try {
      const rows: any = await this.employeeRepository.findById(id);

      if (!rows?.length) {
        return { status: "error", code: 404, message: "Employee not found" };
      }

      return {
        status: "success",
        code: 200,
        message: "Employee fetched successfully",
        employee: mapEmployee(rows[0]),
      };
    } catch (error) {
      console.error("EmployeeService.viewEmployee", error);
      return { status: "error", code: 500, message: "Unable to fetch employee" };
    }
  };

  public addEmployee = async (data: {
    fullName: string;
    email: string;
    contactNumber: string;
    position: string;
    department: string;
    dateHired: Date;
    employmentStatus: string;
  }) => {
    try {
      const result: any = await this.employeeRepository.create(data);

      return {
        status: "success",
        code: 201,
        message: "Employee added successfully",
        employeeId: result.insertId,
      };
    } catch (error: any) {
      console.error("EmployeeService.addEmployee", error);

      if (error?.code === "ER_DUP_ENTRY") {
        return {
          status: "error",
          code: 409,
          message: "Employee with this email already exists",
        };
      }

      return { status: "error", code: 500, message: "Unable to add employee" };
    }
  };

  public editEmployee = async (
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
  ) => {
    try {
      const existing: any = await this.employeeRepository.findById(id);

      if (!existing?.length) {
        return { status: "error", code: 404, message: "Employee not found" };
      }

      await this.employeeRepository.update(id, data);
      const updated: any = await this.employeeRepository.findById(id);

      return {
        status: "success",
        code: 200,
        message: "Employee updated successfully",
        employee: mapEmployee(updated[0]),
      };
    } catch (error: any) {
      console.error("EmployeeService.editEmployee", error);

      if (error?.code === "ER_DUP_ENTRY") {
        return {
          status: "error",
          code: 409,
          message: "Employee with this email already exists",
        };
      }

      return { status: "error", code: 500, message: "Unable to update employee" };
    }
  };

  public deleteEmployee = async (id: number) => {
    try {
      const existing: any = await this.employeeRepository.findById(id);

      if (!existing?.length) {
        return { status: "error", code: 404, message: "Employee not found" };
      }

      await this.employeeRepository.delete(id);

      return {
        status: "success",
        code: 200,
        message: "Employee deleted successfully",
      };
    } catch (error) {
      console.error("EmployeeService.deleteEmployee", error);
      return { status: "error", code: 500, message: "Unable to delete employee" };
    }
  };
}
