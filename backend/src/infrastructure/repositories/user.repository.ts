import { prisma } from "../../config/db";
import { UserRole } from "../../generated/prisma/enums";
import { User } from "../models/user.model";

interface IUserRepository {
  create(user: User): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  findByLogin(login: string): Promise<User | null>;
  findAll(filter: Record<string, any>): Promise<User[]>;
  delete(id: number): Promise<void>;
  //   update(id: number, student: Partial<Student>): Promise<Student>;
  //   delete(id: number): Promise<void>;
}

export class UserRepository implements IUserRepository {
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

    return this.mapToUser(user);
  }

  async findAll(filter: Record<string, any>) {
    const allUser = await prisma.user.findMany({ where: filter });
    return allUser as unknown as User[];
  }

  async delete(id: number) {
    await prisma.user.delete({ where: { id } });

    return;
  }

  //   async update(id: number, student: Partial<Student>) {
  //     return await prisma.student.update({ where: { id }, data: { ...student } });
  //   }
}
