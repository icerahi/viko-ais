import { User } from "../../infrastructure/models/user.model";
import { UserRepository } from "../../infrastructure/repositories/user.repository";

export class UserService {
  constructor(private UserRepo: UserRepository) {}

  async create(payload: any) {
    const user = new User(payload.firstName, payload.lastName, payload.role);
    return await this.UserRepo.create(user);
  }

  async getAllUsers(filter: Record<string, any>) {
    return await this.UserRepo.findAll(filter);
  }
  async delete(id: number) {
    return await this.UserRepo.delete(id);
  }
}
