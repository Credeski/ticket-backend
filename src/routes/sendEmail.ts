import { Router } from "express";
import { orderRecievedEmail } from "$/controllers/emailController/orderRecievedEmail";
import asyncHandler from "$/middlewares/catchAsyncErrors";
import { orderConfirmedEmail } from "$/controllers/emailController/orderConfirmedEmail";
import { orderDeclinedEmail } from "$/controllers/emailController/orderDeclinedEmail";
import { checkIfUserAccountExist } from "$/controllers/emailController/middleware/checkIfEmailExist";

const sendEmailRouter = Router();
sendEmailRouter.get(
  "/orderRecieved/:email",
  asyncHandler(checkIfUserAccountExist),
  asyncHandler(orderRecievedEmail)
);
sendEmailRouter.get(
  "/orderConfirmed/:email",
  asyncHandler(checkIfUserAccountExist),
  asyncHandler(orderConfirmedEmail)
);
sendEmailRouter.get(
  "/orderDeclined/:email",
  asyncHandler(checkIfUserAccountExist),
  asyncHandler(orderDeclinedEmail)
);

export default sendEmailRouter;
