import { z } from "zod";
export const signUpSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character."
    )
    .min(1, "Password is required."),
  fullName: z.string().min(1, "Full name is required."),
  role: z.enum(["admin", "user"], {
    errorMap: () => ({ message: "Role must be either 'admin' or 'user'." })
  }),
  mode: z.literal("signUp")
});
