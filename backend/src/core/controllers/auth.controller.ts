import { Request, Response } from "express";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(private authService: AuthService) {}

  login = catchAsync(async (req: Request, res: Response) => {
    const result = await this.authService.login(req.body);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Login successfully",
      data: result,
    });
  });

  logout = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Logout successfully",
      data: null,
    });
  });
}
