import { db } from "$/db/connect";
import { userSchema } from "$/db/schema";
import ErrorHandler from "$/utils/errorHandler";
import { eq } from "drizzle-orm";
import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";

export const handleRefreshToken = async (
    req: Request,
    res: Response
): Promise<Response | undefined> => {
    const cookies = req.cookies;
    if (!cookies?.ticket) return res.sendStatus(401);
    const refreshToken = cookies.ticket as string;
    // if (!foundUser) return res.sendStatus(403); //unauthorized

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
        async (err, decoded) => {
            if (!decoded) {
                return new ErrorHandler("Unauthorized", 403);
            }
            const findEmail = await db
                .select()
                .from(userSchema)
                // @ts-expect-error  i can't extend the type of decoded so i had to ignore
                .where(eq(userSchema.email, decoded.email))
                .then((users) => users[0]);
            // @ts-expect-error  i can't extend the type of decoded so i had to ignore
            if (err || findEmail.email !== decoded.email)
                return new ErrorHandler("Unauthorized", 403);
            // const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    email: findEmail.email,
                    role: findEmail.role
                },
                process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: "30s" }
            );
            res.json({ accessToken });
        }
    );
};
