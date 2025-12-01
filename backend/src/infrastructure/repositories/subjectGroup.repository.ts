import { prisma } from "../../config/db";
import { SubjectGroup } from "../models/subjectGroup.model";

interface ISubjectGroupRepository {
  create(payload: SubjectGroup): Promise<SubjectGroup | null>;
  getAllSubjectGroup(): Promise<SubjectGroup[]>;
  delete(id: number): Promise<void>;
}

export class SubjectGroupRepository implements ISubjectGroupRepository {
  private mapToSubjectGroup(prismaSubjectGroup: any) {
    return new SubjectGroup(
      prismaSubjectGroup.subjectId,
      prismaSubjectGroup.groupId
    );
  }

  async create(payload: SubjectGroup) {
    const newSubjectGroup = await prisma.subjectGroup.create({
      data: {
        subjectId: payload.getGroupId(),
        groupId: payload.getSubjectId(),
      },
    });
    return this.mapToSubjectGroup(newSubjectGroup);
  }

  async getAllSubjectGroup() {
    const result = await prisma.subjectGroup.findMany({
      select: { group: true, subject: true },
    });
    return result as unknown as SubjectGroup[];
  }

  async delete(id: number) {
    await prisma.subjectGroup.delete({
      where: { id },
    });

    return;
  }
}
