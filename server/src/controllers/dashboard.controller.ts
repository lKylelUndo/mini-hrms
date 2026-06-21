import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";

class DashboardController {
  private dashboardService = new DashboardService();

  public getStats = async (_req: Request, res: Response) => {
    const response = await this.dashboardService.getStats();
    return res.status(response.code).json(response);
  };
}

export default new DashboardController();
