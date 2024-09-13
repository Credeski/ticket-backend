import { type Request, type Response, type NextFunction } from "express";
import express from "express";

export const jsonParser = (
    request: Request,
    response: Response,
    next: NextFunction
): void => {
    if (request.originalUrl === "/webhook") {
        next();
    } else {
        express.json()(request, response, next);
    }
};
