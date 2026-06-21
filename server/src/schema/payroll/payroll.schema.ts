import { z } from "zod";

export const generatePayrollSchema = z.object({
  body: z.object({
    month: z.coerce.number().min(1).max(12).optional(),
    year: z.coerce.number().min(2000).optional(),
  }),
});

export const payrollSummarySchema = z.object({
  query: z.object({
    month: z.coerce.number().min(1).max(12).optional(),
    year: z.coerce.number().min(2000).optional(),
  }),
});
