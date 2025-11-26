import { Student } from "../../models/Student";

export interface IStudentRepo {
  create(
    userId: string,
    firstName: string,
    groupId?: string | null
  ): Promise<Student>;

  findById(id: string): Promise<Student | null>;
  findByUserId(userId: string): Promise<Student | null>;
  listByGroup(groupId: string): Promise<Student[]>;
}
