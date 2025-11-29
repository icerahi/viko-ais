import { NextFunction, Request, Response } from "express";
import status from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../utils/ApiError";

export const Auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken =
        req.cookies?.accessToken || req.headers?.authorization;
      console.log(req.cookies);

      console.log(accessToken);
      if (!accessToken) {
        throw new ApiError(status.FORBIDDEN, "No token received");
      }

      const decodedToken = jwt.verify(
        accessToken,
        process.env.JWT_SECRET!
      ) as JwtPayload;

      if (!roles.includes(decodedToken.role)) {
        throw new ApiError(
          status.UNAUTHORIZED,
          "You are not authorize to access this route"
        );
      }

      req.user = decodedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
