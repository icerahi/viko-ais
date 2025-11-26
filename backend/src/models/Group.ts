export class Group {
  _id: string;
  _name: string;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
}
