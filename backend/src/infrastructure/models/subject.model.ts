export class Subject {
  constructor(private name: string, private teacherId?: number) {}

  getName() {
    return this.name;
  }

  getTeacherId() {
    return this.teacherId;
  }
}
