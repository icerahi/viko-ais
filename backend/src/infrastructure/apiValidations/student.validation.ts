import z from "zod";

export const assignGroupAPISchema = z.object({
  groupId: z.number(),
});
