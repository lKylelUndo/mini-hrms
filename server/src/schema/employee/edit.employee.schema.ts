import { z } from "zod";

export const editEmployeeSchema = z.object({
  body: z.object({
    id: z.number(),
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    contactNumber: z.string().min(7, "Contact number is required"),
    position: z.string().min(1, "Position is required"),
    department: z.string().min(1, "Department is required"),
    dateHired: z.coerce.date(),
    employmentStatus: z.enum(["ACTIVE", "RESIGNED", "ON LEAVE"]),
  })
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided to update",
    }),
});