import { Subject } from "../../infrastructure/models/subject.model";
import { SubjectRepository } from "../../infrastructure/repositories/subject.repository";

export class SubjectService {
  constructor(private subjectRepo: SubjectRepository) {}

  async create(payload: any) {
    const newSubject = new Subject(payload.name);
    return await this.subjectRepo.create(newSubject);
  }

  async getAllSubjects() {
    return await this.subjectRepo.getAllSubjects();
  }

  async delete(id: number) {
    return await this.subjectRepo.delete(id);
  }

  async update(id: number, payload: any) {
    return await this.subjectRepo.update(id, payload);
  }
}
