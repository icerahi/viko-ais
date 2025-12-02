import status from "http-status";
import { prisma } from "../../config/db";
import { UserRole } from "../../generated/prisma/enums";
import ApiError from "../../utils/ApiError";
import { Student } from "../models/student.models";

interface IStudentRepository {
  assignGroup(userId: number, groupId: number): Promise<Student>;
  allStudents(): Promise<any>;
  teacherStudents(teacherId: number, subjectId: number): Promise<any>;
}

export class StudentRepository implements IStudentRepository {
  private mapToStudent(prismaStudent: any) {
    return new Student(prismaStudent.userId, prismaStudent.groupId);
  }

  async assignGroup(userId: number, groupId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    if (user.role !== UserRole.STUDENT) {
      throw new ApiError(
        status.FORBIDDEN,
        `Not possible to assign group to role ${user.role}`
      );
    }

    const result = await prisma.student.update({
      where: { userId },
      data: { groupId },
    });
    return this.mapToStudent(result);
  }

  async allStudents() {
    const students = await prisma.student.findMany({
      select: {
        group: true,
        user: {
          select: { id: true, firstName: true, lastName: true, role: true },
        },
      },
    });

    return students;
  }

  async teacherStudents(teacherId: number, subjectId: number) {
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });
    if (!subject) {
      throw new ApiError(404, "Subject doesn't exists");
    }
    if (subject.teacherId !== teacherId) {
      throw new ApiError(
        status.BAD_REQUEST,
        "You are not teacher of this subject"
      );
    }

    const subjectGroups = await prisma.subjectGroup.findMany({
      where: { subjectId },
      select: { groupId: true },
    });
    const groupIds = subjectGroups.map((g) => g.groupId);

    const students = await prisma.student.findMany({
      where: { groupId: { in: groupIds } },
      include: { user: true },
    });

    const grouped = groupIds.map((groupId) => ({
      groupId,
      students: students.filter((s) => s.groupId === groupId),
    }));

    return grouped;
  }
}
