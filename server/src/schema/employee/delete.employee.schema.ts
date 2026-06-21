import { z } from "zod";

export const deleteEmployeeSchema = z.object({
  body: z.object({
    id: z.number().min(1, "Employee id is required")
  }),
});