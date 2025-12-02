import status from "http-status";
import { prisma } from "../../config/db";
import { UserRole } from "../../generated/prisma/enums";
import ApiError from "../../utils/ApiError";

interface IGradeRepository {
  create(payload: any): Promise<any>;
  update(id: number, payload: any): Promise<any>;
  getAllGrades(subjectId: number): Promise<any>;
}

export class GradeRepository implements IGradeRepository {
  async create(payload: any) {
    const user = await prisma.user.findUnique({
      where: { id: payload.studentId },
    });

    if (!user) {
      throw new ApiError(404, "Student does not exist");
    }

    if (user.role !== UserRole.STUDENT) {
      throw new ApiError(
        status.BAD_REQUEST,
        `Not possible to give grade to role ${user.role}`
      );
    }

    const subject = await prisma.subject.findUnique({
      where: { id: payload.subjectId },
    });
    if (!subject) {
      throw new ApiError(404, "Subject doesn't exists");
    }

    return await prisma.grade.create({ data: payload });
  }

  async update(id: number, payload: any) {
    const gradeExists = await prisma.grade.findUnique({ where: { id } });

    if (!gradeExists) {
      throw new ApiError(404, "Grade not found!");
    }

    return await prisma.grade.update({ where: { id }, data: payload });
  }

  async getAllGrades(subjectId: number) {
    return await prisma.grade.findMany({ where: { subjectId } });
  }

  async myGrade(studentId: number) {
    return await prisma.grade.findMany({
      where: { studentId },
      include: { subject: true },
    });
  }
}
