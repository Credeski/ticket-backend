import asyncHandler from "$/middlewares/catchAsyncErrors";
import { stripePayment } from "$/stripePayment";
// import { checkIfUserAuthenticated } from "$/middlewares/isUserAuthenticated";
import { Router } from "express";

const stripeRouter = Router();

stripeRouter.post(
    "/",
    // checkIfUserAuthenticated,
    asyncHandler(stripePayment)
);

export default stripeRouter;
