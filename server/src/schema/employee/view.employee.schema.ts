import { z } from "zod";

export const viewEmployeeSchema = z.object({
  body: z.object({
    id: z.number().min(1, "Employee id is required")
  }),
});