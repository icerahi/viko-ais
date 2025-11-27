import { prisma } from "../../config/db";
import { User } from "../models/user.model";

interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByLogin(login: string): Promise<User | null>;
  //     findAll(): Promise<Student[]>;
  //   update(id: number, student: Partial<Student>): Promise<Student>;
  //   delete(id: number): Promise<void>;
}

export class UserRepository implements IUserRepository {
  private mapToUser(prismaUser: any): User {
    return new User(prismaUser.firstName, prismaUser.lastName, prismaUser.role);
  }
  async create(user: User) {
    let counter = 0;
    while (await this.findByLogin(user.getLogin())) {
      user.setLogin(`${user.getFirstName()}${counter++}`);
    }

    const newStudent = await prisma.user.create({
      data: {
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        login: user.getLogin(),
        password: user.getPassword(),
        role: user.getRole(),
      },
    });

    return this.mapToUser(newStudent);
  }

  async findById(id: number): Promise<User | null> {
    const result = await prisma.user.findUnique({ where: { id } });
    if (!result) return null;

    return result as unknown as User;
  }

  async findByLogin(login: string) {
    const result = await prisma.user.findUnique({ where: { login } });
    if (!result) return null;

    return result as unknown as User;
  }

  //   async findAll() {
  //     return await prisma.student.findMany();
  //   }

  //   async update(id: number, student: Partial<Student>) {
  //     return await prisma.student.update({ where: { id }, data: { ...student } });
  //   }

  //   async delete(id: number) {
  //     return await prisma.student.delete({ where: { id } });
  //   }
}
