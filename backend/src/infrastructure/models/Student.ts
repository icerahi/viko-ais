import { UserRole } from "../../generated/prisma/enums";
import { User } from "./user.model";

export class Student extends User {
  private groupId: number;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    groupId: number
  ) {
    super(firstName, lastName, UserRole.STUDENT);
    this.groupId = groupId;
  }

  getGroupId() {
    return this.groupId;
  }

  override showInfo(): string {
    return `Student: ${super.showInfo()}, Group:${this.groupId}`;
  }
}
