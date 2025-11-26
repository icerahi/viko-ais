import { Teacher } from "../../models/Teacher";
export interface ITeacherRepo {
  create(userId: string, firstName: string, lastName: string): Promise<Teacher>;
  findById(id: string): Promise<Teacher | null>;
  findByUserId(userId: string): Promise<Teacher | null>;
}
