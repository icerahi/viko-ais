import { UserRole } from "../generated/prisma/enums";

export class UserModel {
  private _id: string;
  private _login: string;
  private _password: string;
  private _email?: string;
  private _role: UserRole;

  constructor(
    id: string,
    login: string,
    password: string,
    role: UserRole,
    email?: string
  ) {
    this._id = id;
    this._login = login;
    this._password = password;
    this._role = role;
    this._email = email;
  }

  get id() {
    return this._id;
  }
  get login() {
    return this._login;
  }
  get password() {
    return this._password;
  }
  get email() {
    return this._email;
  }
  get role() {
    return this._role;
  }
}
