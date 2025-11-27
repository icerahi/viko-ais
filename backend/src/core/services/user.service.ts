import { User } from "../../infrastructure/models/user.model";
import { UserRepository } from "../../infrastructure/repositories/user.repository";

export class UserService {
  constructor(private UserRepo: UserRepository) {}

  async create(payload: any) {
    const user = new User(payload.firstName, payload.lastName, payload.role);
    return this.UserRepo.create(user);
  }
}
