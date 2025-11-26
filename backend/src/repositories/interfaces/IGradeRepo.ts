import { Grade } from "../../models/Grade";

export interface IGradeRepo {
  create(studentId: string, subjectId: string, value: string): Promise<Grade>;
  update(id: string, value: number): Promise<Grade>;
  findByStudentAndSubject(studentId: string, subjectId: string): Promise<Grade>;
  listByStudent(studentId: string): Promise<Grade[]>;
  listBySubjectAndGroup(subjectId: string, groupId: string): Promise<Grade[]>;
}
