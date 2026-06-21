import { DashboardRepository } from "../repositories/dashboard.repository";

export class DashboardService {
  private dashboardRepository = new DashboardRepository();

  public getStats = async () => {
    try {
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();

      const counts: any = await this.dashboardRepository.getEmployeeCounts();
      let totalMonthlyPayroll =
        await this.dashboardRepository.getMonthlyPayrollTotal(month, year);

      if (totalMonthlyPayroll === 0) {
        totalMonthlyPayroll =
          await this.dashboardRepository.getActiveSalaryTotal();
      }

      return {
        status: "success",
        code: 200,
        message: "Dashboard stats fetched successfully",
        stats: {
          totalEmployees: Number(counts.totalEmployees ?? 0),
          activeEmployees: Number(counts.activeEmployees ?? 0),
          onLeaveEmployees: Number(counts.onLeaveEmployees ?? 0),
          totalMonthlyPayroll,
        },
      };
    } catch (error) {
      console.error("DashboardService.getStats", error);
      return {
        status: "error",
        code: 500,
        message: "Unable to fetch dashboard stats",
      };
    }
  };
}
