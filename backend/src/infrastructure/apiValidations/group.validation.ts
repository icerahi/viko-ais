import z from "zod";

export const createGroupAPISchema = z.object({
  name: z.string(),
});

export const assignSubjectAPISchema = z.object({
  subjectId: z.number(),
});
