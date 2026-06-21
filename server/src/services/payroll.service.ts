import { PayrollRepository } from "../repositories/payroll.repository";
import { mapPayroll } from "../utils/mapper.util";

export class PayrollService {
  private payrollRepository = new PayrollRepository();

  public getPayrollSummary = async (month?: number, year?: number) => {
    try {
      const rows: any = await this.payrollRepository.findAll(month, year);

      return {
        status: "success",
        code: 200,
        message: "Payroll summary fetched successfully",
        payroll: rows.map(mapPayroll),
      };
    } catch (error) {
      console.error("PayrollService.getPayrollSummary", error);
      return {
        status: "error",
        code: 500,
        message: "Unable to fetch payroll summary",
      };
    }
  };

  public generatePayroll = async (month?: number, year?: number) => {
    try {
      const now = new Date();
      const targetMonth = month ?? now.getMonth() + 1;
      const targetYear = year ?? now.getFullYear();
      const payrollDate = `${targetYear}-${String(targetMonth).padStart(2, "0")}-01`;

      const exists = await this.payrollRepository.existsForMonth(
        targetMonth,
        targetYear
      );

      if (exists) {
        return {
          status: "error",
          code: 409,
          message: "Payroll for this month has already been generated",
        };
      }

      await this.payrollRepository.generateForMonth(
        targetMonth,
        targetYear,
        payrollDate
      );

      const rows: any = await this.payrollRepository.findAll(
        targetMonth,
        targetYear
      );

      return {
        status: "success",
        code: 201,
        message: "Payroll generated successfully",
        payroll: rows.map(mapPayroll),
      };
    } catch (error) {
      console.error("PayrollService.generatePayroll", error);
      return {
        status: "error",
        code: 500,
        message: "Unable to generate payroll",
      };
    }
  };
}
