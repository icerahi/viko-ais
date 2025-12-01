import status from "http-status";
import { prisma } from "../../config/db";
import ApiError from "../../utils/ApiError";
import { Subject } from "../models/subject.model";

interface ISubjectRepository {
  create(payload: any): Promise<Subject | null>;
  getAllSubjects(): Promise<Subject[]>;
  delete(id: number): Promise<void>;
  update(id: number, payload: any): Promise<Subject>;
}

export class SubjectRepository implements ISubjectRepository {
  private mapToSubject(prismaSubject: any) {
    return new Subject(prismaSubject?.name, prismaSubject?.teacherId);
  }

  async create(payload: Subject) {
    const newSubject = await prisma.subject.create({
      data: { name: payload.getName() },
    });

    return this.mapToSubject(newSubject);
  }

  async getAllSubjects() {
    const subjects = await prisma.subject.findMany({
      select: {
        name: true,
        subjectGroups: true,
        teacher: {
          select: {
            user: { select: { firstName: true, lastName: true, role: true } },
          },
        },
      },
    });
    return subjects as unknown as Subject[];
  }

  async delete(id: number) {
    await prisma.subject.delete({ where: { id } });

    return;
  }

  async update(id: number, payload: any) {
    const subject = await prisma.subject.findUnique({ where: { id } });
    if (!subject) {
      throw new ApiError(status.NOT_FOUND, "Subject not found!");
    }

    const updatedSubject = await prisma.subject.update({
      where: { id },
      data: { ...payload },
    });

    console.log({ updatedSubject });
    return this.mapToSubject(updatedSubject);
  }
}
