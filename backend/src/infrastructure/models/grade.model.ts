export class Grade {
  constructor(
    private studentId: number,
    private subjectId: number,
    private value: number
  ) {}

  getStudentId() {
    return this.studentId;
  }
  getSubjectId() {
    return this.subjectId;
  }
  getValue() {
    return this.value;
  }
}
