import { User, UserRole } from "./User";

// OOP Principle: Inheritance
// Student inherits from User, gaining all its properties and methods.
export class Student extends User {
  private _groupId: number | null;

  constructor(id: number, firstName: string, lastName: string, login: string, groupId: number | null) {
    super(id, firstName, lastName, login, UserRole.STUDENT);
    this._groupId = groupId;
  }

  public get groupId(): number | null {
    return this._groupId;
  }

  public set groupId(value: number | null) {
    this._groupId = value;
  }

  // OOP Principle: Polymorphism
  // Overriding the base method to provide specific Student information.
  public showInformation(): string {
    return `Student: ${this.firstName} ${this.lastName}, Group ID: ${this._groupId || "None"}`;
  }
}
