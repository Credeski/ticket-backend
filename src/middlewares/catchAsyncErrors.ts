import {
  type Request,
  type Response,
  type NextFunction,
  type RequestHandler
} from "express";

const asyncHandler = (theFunc: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
};

export default asyncHandler;
