import { Request, Response } from "express";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { GroupService } from "../services/group.service";

export class GroupController {
  constructor(private groupService: GroupService) {}

  create = catchAsync(async (req: Request, res: Response) => {
    const result = await this.groupService.create(req.body);

    sendResponse(res, {
      success: true,
      statusCode: status.CREATED,
      message: "Group created successfully",
      data: result,
    });
  });

  getAllGroups = catchAsync(async (req: Request, res: Response) => {
    const result = await this.groupService.getAllGroups();

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Groups retrieved successfully",
      data: result,
    });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    await this.groupService.delete(Number(req.params.id));

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Group deleted successfully",
      data: null,
    });
  });

  assignSubject = catchAsync(async (req: Request, res: Response) => {
    await this.groupService.assignSubject(req.body);

    sendResponse(res, {
      success: true,
      statusCode: status.CREATED,
      message: "Subject Assigned successfully",
      data: null,
    });
  });
}
