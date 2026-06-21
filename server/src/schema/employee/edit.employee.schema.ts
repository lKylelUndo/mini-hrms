import { z } from "zod";

export const editEmployeeSchema = z.object({
  body: z
    .object({
      id: z.number(),
      fullName: z.string().min(2, "Full name is required").optional(),
      email: z.string().email("Invalid email address").optional(),
      contactNumber: z.string().min(7, "Contact number is required").optional(),
      position: z.string().min(1, "Position is required").optional(),
      department: z.string().min(1, "Department is required").optional(),
      dateHired: z.coerce.date().optional(),
      employmentStatus: z.enum(["ACTIVE", "RESIGNED", "ON LEAVE"]).optional(),
    })
    .refine((data) => Object.keys(data).length > 1, {
      message: "At least one field must be provided to update",
    }),
});