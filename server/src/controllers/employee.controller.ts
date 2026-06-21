import { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";

class EmployeeController {
  private employeeService = new EmployeeService();

  public getAllEmployees = async (_req: Request, res: Response) => {
    const response = await this.employeeService.getAllEmployees();
    return res.status(response.code).json(response);
  };

  public getActiveEmployees = async (_req: Request, res: Response) => {
    const response = await this.employeeService.getActiveEmployees();
    return res.status(response.code).json(response);
  };

  public getOnLeaveEmployees = async (_req: Request, res: Response) => {
    const response = await this.employeeService.getOnLeaveEmployees();
    return res.status(response.code).json(response);
  };

  public viewEmployee = async (req: Request, res: Response) => {
    const { id } = req.body ?? {};
    const response = await this.employeeService.viewEmployee(id);
    return res.status(response.code).json(response);
  };

  public addEmployee = async (req: Request, res: Response) => {
    const response = await this.employeeService.addEmployee(req.body);
    return res.status(response.code).json(response);
  };

  public editEmployee = async (req: Request, res: Response) => {
    const { id, ...data } = req.body ?? {};
    const response = await this.employeeService.editEmployee(id, data);
    return res.status(response.code).json(response);
  };

  public deleteEmployee = async (req: Request, res: Response) => {
    const { id } = req.body ?? {};
    const response = await this.employeeService.deleteEmployee(id);
    return res.status(response.code).json(response);
  };
}

export default new EmployeeController();
