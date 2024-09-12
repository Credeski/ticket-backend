import { db } from "$/db/connect";
import { userSchema, type UserSchema } from "$/db/schema/user";
import { encryptPassword } from "$/utils/encryptPassword";
import { type Request, type Response } from "express";

type UserRole = "admin" | "user";
type SignUpData = UserSchema & { mode: "signUp"; role: UserRole };

export async function registerUser(
    request: Request<object, object, SignUpData, object>,
    response: Response
): Promise<void> {
    const { email, password, fullName, role } = request.body;

    const encryptPass = await encryptPassword(password);
    await db
        .insert(userSchema)
        .values({ email, fullName, password: encryptPass, role });

    response.status(201).json({ message: "User registered successfully!" });
}
