import { Request, Response } from "express";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { DashboardService } from "../services/dashboard.service";

export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  getDashboardInfo = catchAsync(async (req: Request, res: Response) => {
    const result = await this.dashboardService.getDashboardInfo();

    sendResponse(res, {
      success: true,
      statusCode: status.CREATED,
      message: "Dashboard info retrieved successfully",
      data: result,
    });
  });
}
