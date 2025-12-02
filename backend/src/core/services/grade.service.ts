import { GradeRepository } from "../../infrastructure/repositories/grade.repository";

export class GradeService {
  constructor(private gradeRepository: GradeRepository) {}

  async create(payload: any) {
    return await this.gradeRepository.create(payload);
  }

  async update(id: number, payload: any) {
    return await this.gradeRepository.update(id, payload);
  }

  async getAllGrades(subjectId: number) {
    return await this.gradeRepository.getAllGrades(subjectId);
  }

  async myGrades(studentId: number) {
    return await this.gradeRepository.myGrade(studentId);
  }
}
