import { UserRole } from "../../generated/prisma/enums";
import { UserModel } from "../../models/User";

export interface IUserRepo {
  create(
    login: string,
    password: string,
    role: UserRole,
    email?: string
  ): Promise<UserModel>;
  findByLogin(login: string): Promise<UserModel | null>;
  findById(id: string): Promise<UserModel | null>;
}
