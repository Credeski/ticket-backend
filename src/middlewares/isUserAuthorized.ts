import ErrorHandler from "$/utils/errorHandler";
import { type Request, type Response, type NextFunction } from "express";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            role: string;
        }
    }
}

export const checkIfUserAuthorized = (
    request: Request,
    _response: Response,
    next: NextFunction
): void => {
    if (!request.role) {
        return next(new ErrorHandler("Unauthorized", 401));
    }
    if (request.role === "admin") {
        next();
    }
};
