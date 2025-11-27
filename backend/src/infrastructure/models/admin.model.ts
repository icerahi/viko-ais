import { UserRole } from "../../generated/prisma/enums";
import { User } from "./user.model";

export class Admin extends User {
  constructor(id: number, firstName: string, lastName: string) {
    super(firstName, lastName, UserRole.ADMIN);
  }

  override showInfo(): string {
    return `Admin: ${super.showInfo()}`;
  }
}
