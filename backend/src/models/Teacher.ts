export class Teacher {
  private _id: string;
  private _userId: string;
  private _firstName: string;
  private _lastName: string;

  constructor(id: string, userId: string, firstName: string, lastName: string) {
    this._id = id;
    this._userId = userId;
    this._firstName = firstName;
    this._lastName = lastName;
  }

  get id() {
    return this._id;
  }
  get userId() {
    return this._userId;
  }
  get firstName() {
    return this._firstName;
  }
  get lastName() {
    return this._lastName;
  }

  async getDashboardInfo() {
    return {
      message: `Teacher ${this._firstName} ${this._lastName} dashboard`,
    };
  }
}
