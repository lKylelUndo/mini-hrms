import { z } from "zod";

export const recordAttendanceSchema = z.object({
  body: z.object({
    employeeId: z.number().min(1, "Employee id is required"),
    date: z.string().min(1, "Date is required"),
    timeIn: z.string().nullable().optional(),
    timeOut: z.string().nullable().optional(),
    status: z.enum(["PRESENT", "LATE", "ABSENT", "ON LEAVE"]),
  }),
});
