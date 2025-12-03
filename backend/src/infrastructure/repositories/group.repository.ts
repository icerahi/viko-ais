import status from "http-status";
import { prisma } from "../../config/db";
import ApiError from "../../utils/ApiError";
import { Group } from "../models/group.model";

interface IGroupRepository {
  create(payload: Group): Promise<Group | null>;
  getAllGroups(): Promise<Group[]>;
  delete(id: number): Promise<void>;
}

export class GroupRepository implements IGroupRepository {
  private mapToGroup(prismaGroup: any) {
    return new Group(prismaGroup.name);
  }

  async create(payload: Group) {
    const newGroup = await prisma.group.create({
      data: { name: payload.getName() },
    });
    return this.mapToGroup(newGroup);
  }

  async getAllGroups() {
    const result = await prisma.group.findMany({
      include: { students: true, subjectGroup: { include: { subject: true } } },
    });
    return result as unknown as Group[];
  }

  async delete(id: number) {
    await prisma.group.delete({ where: { id } });

    return;
  }

  async assignSubject(groupId: number, subjectId: number) {
    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });

    if (!group) {
      throw new ApiError(404, "Group Id does not exists");
    }
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });
    if (!subject) {
      throw new ApiError(404, "Subject Id does not exists");
    }

    const exists = await prisma.subjectGroup.findFirst({
      where: { groupId: group.id, subjectId: subjectId },
    });
    if (exists) {
      throw new ApiError(status.BAD_REQUEST, "Record already exists!");
    }

    const result = await prisma.subjectGroup.create({
      data: {
        groupId: groupId,
        subjectId: subjectId,
      },
    });

    return result;
  }

  async removeSubject(groupId: number, subjectId: number) {
    const result = await prisma.subjectGroup.deleteMany({
      where: {
        groupId: groupId,
        subjectId: subjectId,
      },
    });
    return result;
  }
}
