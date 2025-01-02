import {
  getAllEvent,
  getEvent,
  getPaymentForAnEvent,
  registerEvent
} from "$/controllers/eventController";
import asyncHandler from "$/middlewares/catchAsyncErrors";
import { checkIfUserAuthenticated } from "$/middlewares/isUserAuthenticated";
import { checkIfUserAuthorized } from "$/middlewares/isUserAuthorized";
import { Router } from "express";

const eventRouter = Router();

eventRouter.post(
  "/registerEvent",
  checkIfUserAuthenticated,
  checkIfUserAuthorized,
  asyncHandler(registerEvent)
);
eventRouter.get(
  "/getEvent/:id",
  checkIfUserAuthenticated,
  asyncHandler(getEvent)
);
eventRouter.get(
  "/getPaymentForEvent/:id",
  checkIfUserAuthenticated,
  checkIfUserAuthorized,
  asyncHandler(getPaymentForAnEvent)
);
eventRouter.get("/getAllEvent", asyncHandler(getAllEvent));

export default eventRouter;
