import { Request, Response } from "express";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SubjectGroupService } from "../services/subjectGroup.service";

export class SubjectGroupController {
  constructor(private subjectGroupService: SubjectGroupService) {}

  getAllSubjectGroup = catchAsync(async (req: Request, res: Response) => {
    const result = await this.subjectGroupService.getAllSubjectGroup();

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Subject Group retrieved successfully",
      data: result,
    });
  });
}
