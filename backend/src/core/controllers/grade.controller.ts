import { Request, Response } from "express";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { GradeService } from "../services/grade.service";

export class GradeController {
  constructor(private gradeService: GradeService) {}

  create = catchAsync(async (req: Request, res: Response) => {
    const result = await this.gradeService.create(req.body);

    sendResponse(res, {
      success: true,
      statusCode: status.CREATED,
      message: "Grade Added successfully",
      data: result,
    });
  });

  update = catchAsync(async (req: Request, res: Response) => {
    const result = await this.gradeService.update(
      Number(req.params.id),
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Grade updated successfully",
      data: result,
    });
  });

  getAllGrades = catchAsync(async (req: Request, res: Response) => {
    const result = await this.gradeService.getAllGrades(
      Number(req.params.subjectId)
    );

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Grades retreived successfully",
      data: result,
    });
  });

  myGrade = catchAsync(async (req: Request, res: Response) => {
    const result = await this.gradeService.myGrades(req.user.id);

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Grades retreived successfully",
      data: result,
    });
  });
}
