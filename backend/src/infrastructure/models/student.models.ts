export class Student {
  constructor(private userId: number, private groupId?: number) {}

  getGroupId() {
    return this.groupId;
  }
  getUserId() {
    return this.userId;
  }
}
