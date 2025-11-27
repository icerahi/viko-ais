import { UserRole } from "../../generated/prisma/enums";
import { User } from "./user.model";

export class Teacher extends User {
  constructor(id: number, firstName: string, lastName: string) {
    super(firstName, lastName, UserRole.TEACHER);
  }

  override showInfo(): string {
    return `Teacher: ${super.showInfo()}`;
  }
}
