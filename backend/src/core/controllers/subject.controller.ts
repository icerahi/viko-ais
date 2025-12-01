import { Request, Response } from "express";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SubjectService } from "../services/subject.service";

export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  create = catchAsync(async (req: Request, res: Response) => {
    const result = await this.subjectService.create(req.body);

    sendResponse(res, {
      success: true,
      statusCode: status.CREATED,
      message: "Subject created successfully",
      data: result,
    });
  });

  getAllSubjects = catchAsync(async (req: Request, res: Response) => {
    const result = await this.subjectService.getAllSubjects();

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Subjects retrieved successfully",
      data: result,
    });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    await this.subjectService.delete(Number(req.params.id));

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Subject deleted successfully",
      data: null,
    });
  });

  update = catchAsync(async (req: Request, res: Response) => {
    const result = await this.subjectService.update(
      Number(req.params.id),
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Subject updated successfully",
      data: result,
    });
  });
}
