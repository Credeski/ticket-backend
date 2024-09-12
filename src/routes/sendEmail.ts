import { Router } from "express";
import { orderRecievedEmail } from "$/controllers/emailController/orderRecievedEmail";
import asyncHandler from "$/middlewares/catchAsyncErrors";

const sendEmailRouter = Router();
sendEmailRouter.get("/orderRecieved/:email", asyncHandler(orderRecievedEmail));

export default sendEmailRouter;
