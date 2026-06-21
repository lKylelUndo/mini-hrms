import { z } from "zod";

export const viewSalarySchema = z.object({
  body: z.object({
    employeeId: z.number().min(1, "Employee id is required"),
  }),
});
