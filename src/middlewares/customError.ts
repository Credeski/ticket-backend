import ErrorHandler from "$/utils/errorHandler";
import { type Request, type Response, type NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  keyValue?: Record<string, "">;
  path?: string;
  name: string;
  // neon db has details as there is no status code
  detail?: string;
}

// Error-handling middleware function
const customError = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.log("error::", err.code, err.name, err);

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // if (err.name === "ZodError") {

  // }

  //   neon database error
  if (err.name === "NeonDbError") {
    if (err.code === 23505) {
      const message = err.detail!;
      err = new ErrorHandler(message, 400);
    }
    if (err.code == undefined) {
      const message = `Error connecting to database: fetch failed`;
      err = new ErrorHandler(message, 500);
    }
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT expired error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode!).json({
    success: false,
    message: err.message
  });
};

export default customError;
