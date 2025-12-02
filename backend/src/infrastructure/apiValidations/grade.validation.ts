import z from "zod";

export const gradeCreateAPISchema = z.object({
  studentId: z.number(),
  subjectId: z.number(),
  value: z.number(),
});

export const gradeUpdateAPISchema = z.object({
  value: z.number(),
});
