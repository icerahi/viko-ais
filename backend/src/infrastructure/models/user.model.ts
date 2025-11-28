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
  getLastName() {
    return this.lastName;
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
  getRole() {
    return this.role;
  }

  showInfo(): string {
    return `${this.firstName} ${this.lastName} (${this.role})`;
  }
}
