// import ErrorHandler from "$/utils/errorHandler";
import ErrorHandler from "$/utils/errorHandler";
import { type Response, type NextFunction, type Request } from "express";
import jwt from "jsonwebtoken";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            role: string;
        }
    }
}

export const checkIfUserAuthenticated = (
    request: Request,
    _response: Response,
    next: NextFunction
): void => {
    const authHeader = request.header("authorization");
    if (!authHeader) {
        throw new ErrorHandler(
            "Please Login to access this resource / No Authorization token present",
            401
        );
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
        if (err) throw new ErrorHandler("Token is inavlid", 403); //forbidded (invalid token)
        // @ts-expect-error  i can't extend the type of decoded so i had to ignore
        request.role = decoded?.role;
        next();
    });
    // const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    // // @ts-expect-error  i can't extend the type of decoded so i had to ignore
    // request.role = decodedData.role;
    // next();
};
