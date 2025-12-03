import { User, UserRole } from "./User";

// OOP Principle: Inheritance
// Teacher inherits from User.
export class Teacher extends User {
  constructor(id: number, firstName: string, lastName: string, login: string) {
    super(id, firstName, lastName, login, UserRole.TEACHER);
  }

  // OOP Principle: Polymorphism
  public showInformation(): string {
    return `Teacher: ${this.firstName} ${this.lastName}`;
  }

  // Teacher specific behavior
  public canGrade(): boolean {
    return true;
  }
}
