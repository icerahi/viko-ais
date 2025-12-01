export class SubjectGroup {
  constructor(private groupId: number, private subjectId: number) {}

  getGroupId() {
    return this.groupId;
  }
  getSubjectId() {
    return this.subjectId;
  }
}
