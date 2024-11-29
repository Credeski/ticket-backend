import { db } from "$/db/connect";
import { userSchema, type UserSchema } from "$/db/schema/user";
import ErrorHandler from "$/utils/errorHandler";
import { setTokens } from "$/utils/token";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { type NextFunction, type Request, type Response } from "express";

type LoginData = UserSchema & { mode: "signIn" };

export async function loginUser(
    request: Request<object, object, LoginData, object>,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { email, password } = request.body;

    if (!email || !password) {
        response
            .status(400)
            .json({ message: "Email and Password are required!" });
    }

    const user = await db
        .selectDistinct()
        .from(userSchema)
        .where(eq(userSchema.email, email));


    if (!user) {
        return next(new ErrorHandler("Invalid Email/Password", 400));
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
        response.status(400).json({ message: "Invalid Email/Password" });
    }

    setTokens(user[0], response);

    // response.status(200).json({ message: "Login successful!" });
}
