import { User, UserRole } from "./User";

// OOP Principle: Inheritance
// Admin inherits from User.
export class Admin extends User {
  constructor(id: number, firstName: string, lastName: string, login: string) {
    super(id, firstName, lastName, login, UserRole.ADMIN);
  }

  // OOP Principle: Polymorphism
  public showInformation(): string {
    return `Administrator: ${this.firstName} ${this.lastName} (System Access)`;
  }
}
