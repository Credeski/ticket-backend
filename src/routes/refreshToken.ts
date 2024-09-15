import { Router } from "express";
import asyncHandler from "$/middlewares/catchAsyncErrors";
import { handleRefreshToken } from "$/controllers/refreshTokenController";

const refreshTokenRouter = Router();
refreshTokenRouter.get("/", asyncHandler(handleRefreshToken));

export default refreshTokenRouter;
