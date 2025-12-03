// OOP Principle: Encapsulation
// The User class encapsulates the core data and behavior of a system user.
// Fields are private and accessed via public getters/setters.

export enum UserRole {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export class User {
  // Private fields (Encapsulation)
  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _login: string;
  private _role: UserRole;

  constructor(id: number, firstName: string, lastName: string, login: string, role: UserRole) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._login = login;
    this._role = role;
  }

  // Public Getters and Setters
  public get id(): number {
    return this._id;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public set firstName(value: string) {
    this._firstName = value;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public set lastName(value: string) {
    this._lastName = value;
  }

  public get login(): string {
    return this._login;
  }

  public get role(): UserRole {
    return this._role;
  }

  // OOP Principle: Polymorphism
  // This method can be overridden by subclasses to provide role-specific information.
  public showInformation(): string {
    return `User: ${this._firstName} ${this._lastName} (${this._role})`;
  }
}
