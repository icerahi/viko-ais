import { prisma } from "../../config/db";
import { UserRole } from "../../generated/prisma/enums";
import { User } from "../models/user.model";

export class UserRepository {
  private mapToUser(prismaUser: any): User {
    return new User(
      prismaUser.firstName,
      prismaUser.lastName,
      prismaUser.role,
      prismaUser.login,
      prismaUser.password
    );
  }

  async create(user: User) {
    //generating unique login
    let counter = 0;
    while (await this.findByLogin(user.getLogin())) {
      user.setLogin(`${user.getFirstName()}${counter++}`);
    }

    const newUser = await prisma.$transaction(async (tx) => {
      const u = await tx.user.create({
        data: {
          firstName: user.getFirstName(),
          lastName: user.getLastName(),
          login: user.getLogin(),
          password: user.getPassword(),
          role: user.getRole(),
        },
      });

      if (u.role === UserRole.STUDENT) {
        await tx.student.create({ data: { userId: u.id } });
      }

      if (u.role === UserRole.TEACHER) {
        await tx.teacher.create({ data: { userId: u.id } });
      }

      if (u.role === UserRole.ADMIN) {
        await tx.admin.create({ data: { userId: u.id } });
      }

      return u;
    });

    return this.mapToUser(newUser);
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;

    return this.mapToUser(user);
  }

  async findByLogin(login: string) {
    const user = await prisma.user.findUnique({ where: { login } });
    if (!user) return null;

    return user;
  }

  async findAll(filter: Record<string, any>) {
    const allUser = await prisma.user.findMany({ where: filter });
    return allUser as unknown as User[];
  }

  async delete(id: number) {
    await prisma.user.delete({ where: { id } });

    return;
  }
}
