import { getTicket } from "$/controllers/ticketController";
import asyncHandler from "$/middlewares/catchAsyncErrors";
import { checkIfUserAuthenticated } from "$/middlewares/isUserAuthenticated";
import { Router } from "express";

const ticketRouter = Router();

ticketRouter.post(
  "/getTicket/:eventId/:userId",
  checkIfUserAuthenticated,
  asyncHandler(getTicket)
);

export default ticketRouter;
