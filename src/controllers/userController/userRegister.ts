import { db } from "$/db/connect";
import { userSchema, type UserSchema } from "$/db/schema/user";
import { encryptPassword } from "$/utils/encryptPassword";
import ErrorHandler from "$/utils/errorHandler";
import { signUpSchema } from "$/zod-schemas/RegisterSchema";
import { eq } from "drizzle-orm";
import { type NextFunction, type Request, type Response } from "express";
import { z } from "zod";

type UserRole = "admin" | "user";
type SignUpData = UserSchema & { role: UserRole };

export async function registerUser(
    request: Request<object, object, SignUpData, object>,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        const validatedData = signUpSchema.parse(request.body);
        const { email, password, fullName, role } = validatedData;

        const encryptPass = await encryptPassword(password);

        const existingUser = await db
            .selectDistinct()
            .from(userSchema)
            .where(eq(userSchema.email, email));

        if (existingUser.length > 0) {
            response.status(400).json({ message: "Email already registered" });
        }

        await db
            .insert(userSchema)
            .values({ email, fullName, password: encryptPass, role });

        response.status(200).json({ message: "User registered successfully!" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({
                // console.log()
                error: "Validation failed",
                details: error.flatten().fieldErrors
            });
        } else if (error instanceof Error) {
            console.error(error);
            return next(new ErrorHandler("Internal Service error", 500));
        } else {
            return next(new ErrorHandler("Unknown error occured", 500));
        }
    }
}
