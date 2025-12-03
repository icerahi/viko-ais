import status from "http-status";
import { prisma } from "../../config/db";
import { UserRole } from "../../generated/prisma/enums";
import ApiError from "../../utils/ApiError";
import { Subject } from "../models/subject.model";

interface ISubjectRepository {
  create(payload: any): Promise<Subject | null>;
  getAllSubjects(): Promise<Subject[]>;
  delete(id: number): Promise<void>;
  update(id: number, payload: any): Promise<Subject>;

  getTeacherSubjects(teacherId: number): Promise<any>;
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
        id: true,
        name: true,
        subjectGroups: true,
        teacher: {
          select: {
            user: {
              select: { id: true, firstName: true, lastName: true, role: true },
            },
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

    if (payload.teacherId) {
      const teacher = await prisma.user.findUnique({
        where: { id: payload.teacherId },
      });
      if (teacher && teacher.role !== UserRole.TEACHER) {
        throw new ApiError(
          status.BAD_REQUEST,
          `Can't update teacher with role ${teacher?.role}`
        );
      }
    }
    const updatedSubject = await prisma.subject.update({
      where: { id },
      data: { ...payload },
    });

    return this.mapToSubject(updatedSubject);
  }

  async getTeacherSubjects(teacherId: number) {
    return await prisma.subject.findMany({ where: { teacherId } });
  }

  async mySubjects(studentId: number) {
    const student = await prisma.student.findUnique({
      where: { userId: studentId },
    });

    if (!student?.groupId) {
      throw new ApiError(status.NO_CONTENT, "You do not have any subjects");
    }

    const subjects = await prisma.subjectGroup.findMany({
      where: { groupId: student?.groupId },
      select: {
        subject: {
          include: {
            teacher: {
              select: { user: { select: { firstName: true, lastName: true } } },
            },
          },
        },
      },
    });

    return subjects;
  }
}
