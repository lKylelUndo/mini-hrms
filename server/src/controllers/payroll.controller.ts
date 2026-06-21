import { Request, Response } from "express";
import { PayrollService } from "../services/payroll.service";

class PayrollController {
  private payrollService = new PayrollService();

  public getPayrollSummary = async (req: Request, res: Response) => {
    const month = req.query.month ? Number(req.query.month) : undefined;
    const year = req.query.year ? Number(req.query.year) : undefined;
    const response = await this.payrollService.getPayrollSummary(month, year);
    return res.status(response.code).json(response);
  };

  public generatePayroll = async (req: Request, res: Response) => {
    const { month, year } = req.body ?? {};
    const response = await this.payrollService.generatePayroll(month, year);
    return res.status(response.code).json(response);
  };
}

export default new PayrollController();
