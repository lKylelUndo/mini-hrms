import { z } from "zod";

export const addSalarySchema = z.object({
  body: z.object({
    employeeId: z.number().min(1, "Employee id is required"),
    basicSalary: z.coerce.number().min(0, "Basic salary must be zero or greater"),
    allowance: z.coerce.number().min(0, "Allowance must be zero or greater"),
    deductions: z.coerce.number().min(0, "Deductions must be zero or greater"),
  }),
});
