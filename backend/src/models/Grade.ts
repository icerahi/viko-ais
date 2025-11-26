export class Grade {
  _id: string;
  _studentId: string;
  _subjectId: string;
  _value: number;
  constructor(id: string, studentId: string, subjectId: string, value: number) {
    this._id = id;
    this._studentId = studentId;
    this._subjectId = subjectId;
    this._value = value;
  }

  get id() {
    return this._id;
  }
  get studentId() {
    return this._studentId;
  }
  get subjectId() {
    return this._subjectId;
  }
  get value() {
    return this._value;
  }
}
