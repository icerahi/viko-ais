import { prisma } from "../../config/db";
import { UserRole } from "../../generated/prisma/enums";

interface IDashboardRepository {
  getDashboardInfo(): Promise<any>;
}

export class DashboardRepository implements IDashboardRepository {
  async getDashboardInfo() {
    const totalUsers = await prisma.user.count();
    const totalTeachers = await prisma.user.count({
      where: { role: UserRole.TEACHER },
    });
    const totalStudents = await prisma.user.count({
      where: { role: UserRole.STUDENT },
    });
    const totalSubjects = await prisma.subject.count();
    const totalGroups = await prisma.group.count();

    return {
      totalUsers,
      totalTeachers,
      totalStudents,
      totalSubjects,
      totalGroups,
    };
  }
}
