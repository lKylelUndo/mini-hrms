import { Request, Response } from "express";
import { SalaryService } from "../services/salary.service";

class SalaryController {
  private salaryService = new SalaryService();

  public getAllSalaries = async (_req: Request, res: Response) => {
    const response = await this.salaryService.getAllSalaries();
    return res.status(response.code).json(response);
  };

  public viewSalary = async (req: Request, res: Response) => {
    const { employeeId } = req.body ?? {};
    const response = await this.salaryService.viewSalary(employeeId);
    return res.status(response.code).json(response);
  };

  public addSalary = async (req: Request, res: Response) => {
    const response = await this.salaryService.addSalary(req.body);
    return res.status(response.code).json(response);
  };

  public updateSalary = async (req: Request, res: Response) => {
    const response = await this.salaryService.updateSalary(req.body);
    return res.status(response.code).json(response);
  };
}

export default new SalaryController();
