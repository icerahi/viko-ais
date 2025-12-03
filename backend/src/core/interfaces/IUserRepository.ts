import { User } from "../models/User";

// OOP Principle: Abstraction
// The IUserRepository interface defines the contract for data access,
// hiding the implementation details (Prisma/SQL) from the business logic.
export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  create(user: User): Promise<User>;
  delete(id: number): Promise<void>;
}
