import { Request, Response } from "express";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentService } from "../services/student.service";

export class StudentController {
  constructor(private studentService: StudentService) {}

  assignGroup = catchAsync(async (req: Request, res: Response) => {
    const result = await this.studentService.assignGroup(
      Number(req.params.userId),
      req.body?.groupId
    );

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Group assigned successfully",
      data: result,
    });
  });

  allStudents = catchAsync(async (req: Request, res: Response) => {
    const result = await this.studentService.allStudents();

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Students retrieve successfully",
      data: result,
    });
  });
}
