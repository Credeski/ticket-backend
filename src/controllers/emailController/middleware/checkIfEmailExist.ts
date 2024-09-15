import { db } from "$/db/connect";
import { userSchema } from "$/db/schema";
import ErrorHandler from "$/utils/errorHandler";
import { eq } from "drizzle-orm";
import { type Response, type NextFunction, type Request } from "express";

export type OrderParams = {
    email?: string;
};

export const checkIfUserAccountExist = async (
    request: Request<OrderParams, object, object, object>,
    _response: Response,
    next: NextFunction
): Promise<ErrorHandler | undefined> => {
    const { email } = request.params;
    const user = await db
        .select()
        .from(userSchema)
        .where(eq(userSchema.email, email!))
        .then((users) => users[0]);

    if (!user) {
        return new ErrorHandler("User not found", 404);
    }
    next();
};
