import { StudentRepository } from "../../infrastructure/repositories/student.repository";

export class StudentService {
  constructor(private studentRepo: StudentRepository) {}

  async assignGroup(userId: number, groupId: number) {
    return await this.studentRepo.assignGroup(userId, groupId);
  }

  async allStudents() {
    return await this.studentRepo.allStudents();
  }
}
