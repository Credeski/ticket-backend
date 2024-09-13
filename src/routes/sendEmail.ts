import { Router } from "express";
import { orderRecievedEmail } from "$/controllers/emailController/orderRecievedEmail";
import asyncHandler from "$/middlewares/catchAsyncErrors";
import { orderConfirmedEmail } from "$/controllers/emailController/orderConfirmedEmail";
import { orderDeclinedEmail } from "$/controllers/emailController/orderDeclinedEmail";

const sendEmailRouter = Router();
sendEmailRouter.get("/orderRecieved/:email", asyncHandler(orderRecievedEmail));
sendEmailRouter.get(
    "/orderConfirmed/:email",
    asyncHandler(orderConfirmedEmail)
);
sendEmailRouter.get("/orderDeclined/:email", asyncHandler(orderDeclinedEmail));

export default sendEmailRouter;
