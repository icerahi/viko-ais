import status from "http-status";
import { prisma } from "../../config/db";
import { UserRole } from "../../generated/prisma/enums";
import ApiError from "../../utils/ApiError";
import { Student } from "../models/student.models";

interface IStudentRepository {
  assignGroup(userId: number, groupId: number): Promise<Student>;
  allStudents(): Promise<any>;
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
}
