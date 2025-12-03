import { Group } from "../../infrastructure/models/group.model";
import { GroupRepository } from "../../infrastructure/repositories/group.repository";

export class GroupService {
  constructor(private groupRepo: GroupRepository) {}

  async create(payload: any) {
    const group = new Group(payload.name);
    return await this.groupRepo.create(group);
  }

  async getAllGroups() {
    return await this.groupRepo.getAllGroups();
  }

  async delete(id: number) {
    return await this.groupRepo.delete(id);
  }

  async assignSubject(groupId:number, subjectId:number) {
    return await this.groupRepo.assignSubject(groupId,subjectId);
  }

  async removeSubject(groupId: number, subjectId: number) {
    return await this.groupRepo.removeSubject(groupId, subjectId);
  }
}
