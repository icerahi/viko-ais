import z from "zod";
import { UserRole } from "../../generated/prisma/enums";

export class UserAPISchema {
  userCreateAPISchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    role: z.enum(UserRole),
  });
}
