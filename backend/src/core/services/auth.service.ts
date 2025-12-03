import status from "http-status";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db";
import { UserRole } from "../../generated/prisma/enums";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import ApiError from "../../utils/ApiError";

export class AuthService {
  constructor(private UserRepo: UserRepository) {}

  async login(payload: { login: string; password: string }) {
    const userExists = await this.UserRepo.findByLogin(payload.login);

    if (!userExists) {
      throw new ApiError(status.NOT_FOUND, "User does not exists");
    }

    const matchPassword = userExists.password === payload.password;
    if (!matchPassword) {
      throw new ApiError(status.BAD_REQUEST, "Incorrect Password");
    }

    let group;
    if (userExists.role === UserRole.STUDENT) {
      const student = await prisma.student.findUnique({
        where: { userId: userExists.id },
        include: { group: true },
      });
      group = student?.group;
    }

    const jwtPayload = {
      id: userExists.id,
      login: userExists.login,
      role: userExists.role,
      group,
    };

    const accessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return { accessToken };
  }
}
