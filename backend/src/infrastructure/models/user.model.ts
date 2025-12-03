import { UserRole } from "../../generated/prisma/enums";

export class User {
  private firstName: string;
  private lastName: string;
  private login: string;
  private password: string;
  private role: UserRole;

  constructor(
    firstName: string,
    lastName: string,
    role: UserRole,
    login?: string,
    password?: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.login = login || firstName.toLowerCase();
    this.password = password || lastName.toLowerCase();
  }

  getFirstName() {
    return this.firstName;
  }
  setFirstName(value: string) {
    this.firstName = value;
  }
  getLastName() {
    return this.lastName;
  }
  setLastName(value: string) {
    this.lastName = value;
  }

  getLogin() {
    return this.login;
  }
  setLogin(login: string) {
    this.login = login;
  }

  getPassword() {
    return this.password;
  }
  setPassword(value: string) {
    return (this.password = value);
  }

  getRole() {
    return this.role;
  }
  setRole(value: UserRole) {
    return (this.role = value);
  }

  showInfo(): string {
    return `${this.firstName} ${this.lastName} (${this.role})`;
  }
}

export class Student extends User {
  private groupId: number | undefined;

  constructor(
    firstName: string,
    lastName: string,
    role: UserRole,
    login?: string,
    password?: string,
    groupId?: number | undefined
  ) {
    super(firstName, lastName, role, login, password);
    this.groupId = groupId;
  }

  getGroupId() {
    return this.groupId;
  }

  setGroupId(value: number) {
    this.groupId = value;
  }

  showInfo(): string {
    return `${this.getFirstName()} ${this.getLastName()} (${this.getRole()} Group:(${this.getGroupId()}))`;
  }
}
export class Teacher extends User {
  constructor(
    firstName: string,
    lastName: string,
    role: UserRole,
    login?: string,
    password?: string
  ) {
    super(firstName, lastName, role, login, password);
  }

  showInfo(): string {
    return `${this.getFirstName()} ${this.getLastName()} (${this.getRole()})`;
  }
}
