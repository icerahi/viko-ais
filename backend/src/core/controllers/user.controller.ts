import { Request, Response } from "express";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  createStudent = catchAsync(async (req: Request, res: Response) => {
    const result = await this.userService.create(req.body);

    sendResponse(res, {
      success: true,
      statusCode: status.CREATED,
      message: "Student created successfully",
      data: result,
    });
  });

  createTeacher = catchAsync(async (req: Request, res: Response) => {
    const result = await this.userService.create(req.body);

    sendResponse(res, {
      success: true,
      statusCode: status.CREATED,
      message: "Teacher created successfully",
      data: result,
    });
  });
}
