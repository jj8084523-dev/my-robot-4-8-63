
import * as z from "zod";

export const registerFormSchema = z.object({
  // Parent information
  parentFullName: z.string().min(2, { message: "Full name is required" }),
  parentEmail: z.string().email({ message: "Please enter a valid email" }),
  parentPhone: z.string().min(10, { message: "Phone number is required" }),

  // Student information
  studentName: z.string().min(2, { message: "Student name is required" }),
  studentAge: z
    .string()
    .refine((val) => {
      const age = parseInt(val);
      return !isNaN(age) && age >= 7 && age <= 16;
    }, { message: "Age must be between 7 and 16" }),
  interestArea: z.enum(["robotics", "arduino", "electronics", "programming", "math"]),
  courseLevel: z.enum(["beginner", "intermediate", "advanced"]),

  // Password
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),

  // Terms and conditions
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
