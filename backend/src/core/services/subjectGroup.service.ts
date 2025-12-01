import { SubjectGroupRepository } from "../../infrastructure/repositories/subjectGroup.repository";

export class SubjectGroupService {
  constructor(private subjectGroupRepo: SubjectGroupRepository) {}

  async getAllSubjectGroup() {
    return await this.subjectGroupRepo.getAllSubjectGroup();
  }
}
