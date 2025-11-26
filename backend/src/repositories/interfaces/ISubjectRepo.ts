import { Subject } from "../../models/Subject";

export interface ISubjectRepo {
  create(name: string): Promise<Subject>;
  findById(id: string): Promise<Subject | null>;
  list(): Promise<Subject[]>;
  delete(id: string): Promise<void>;
}
