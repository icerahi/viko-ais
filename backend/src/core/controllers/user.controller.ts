import { Request, Response } from "express";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  create = catchAsync(async (req: Request, res: Response) => {
    const result = await this.userService.create(req.body);

    sendResponse(res, {
      success: true,
      statusCode: status.CREATED,
      message: "User created successfully",
      data: result,
    });
  });

  getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await this.userService.getAllUsers(req.query);

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Users retreived successfully",
      data: result,
    });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    await this.userService.delete(Number(req.params.id));

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Users deleted successfully",
      data: null,
    });
  });
}
