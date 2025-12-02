import z from "zod";

export const authAPISchema = z.object({
  login: z.string(),
  password: z.string(),
});
