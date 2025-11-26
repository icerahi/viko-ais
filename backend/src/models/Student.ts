export class Student {
  _id: string;
  _userId: string;
  _firstName: string;
  _lastName: string;
  _groupId?: string | null;

  constructor(
    id: string,
    userId: string,
    firstName: string,
    lastName: string,
    groupId?: string | null
  ) {
    this._id = id;
    this._userId = userId;
    this._firstName = firstName;
    this._lastName = lastName;
    this._groupId = groupId ?? null;
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
  set groupId(g: string | null) {
    this._groupId = g;
  }

  async getDashboardInfo() {
    return {
      message: `Student ${this._firstName} ${this._lastName} dashboard`,
    };
  }
}
