import { Group } from "../../models/Group";

export interface IGroupRepo {
  create(name: string): Promise<Group>;
  findById(id: string): Promise<Group | null>;
  list(): Promise<Group[]>;
  delete(id: string): Promise<void>;
}
