"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email("Invalid email format")
        .min(1, "Email is required."),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long.")
        .regex(/[a-zA-Z]/, "Password must contain at least one letter.")
        .regex(/[0-9]/, "Password must contain at least one number.")
        .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character.")
        .min(1, "Password is required."),
    fullName: zod_1.z.string().min(1, "Full name is required."),
    role: zod_1.z.enum(["admin", "user"], {
        errorMap: () => ({ message: "Role must be either 'admin' or 'user'." })
    }),
    mode: zod_1.z.literal("signUp")
});
