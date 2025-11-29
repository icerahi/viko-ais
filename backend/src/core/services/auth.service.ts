import status from "http-status";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import ApiError from "../../utils/ApiError";

export class AuthService {
  constructor(private UserRepo: UserRepository) {}

  async login(payload: { login: string; password: string }) {
    const userExists = await this.UserRepo.findByLogin(payload.login);

    if (!userExists) {
      throw new ApiError(status.NOT_FOUND, "User does not exists");
    }

    const matchPassword = userExists.getPassword() === payload.password;
    if (!matchPassword) {
      throw new ApiError(status.BAD_REQUEST, "Incorrect Password");
    }

    const jwtPayload = {
      login: userExists.getLogin(),
      role: userExists.getRole(),
    };

    const accessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return { accessToken };
  }
}
