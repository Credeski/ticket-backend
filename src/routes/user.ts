import {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  getUserAllPayment,
  getUserAllTicket
} from "$/controllers/userController";
import asyncHandler from "$/middlewares/catchAsyncErrors";
import { checkIfUserAuthenticated } from "$/middlewares/isUserAuthenticated";
import { checkIfUserAuthorized } from "$/middlewares/isUserAuthorized";
import { Router } from "express";
// import { createuser, getUsers, getUsersById } from "../handlers/users";

const userRouter = Router();

userRouter.post("/register", asyncHandler(registerUser));
userRouter.post("/login", asyncHandler(loginUser));
userRouter.get("/logout", asyncHandler(logout));
userRouter.get(
  "/getUser/:email",
  checkIfUserAuthenticated,
  asyncHandler(getUserProfile)
);
userRouter.get(
  "/getUserPayment/:email",
  checkIfUserAuthenticated,
  checkIfUserAuthorized,
  asyncHandler(getUserAllPayment)
);
userRouter.get(
  "/getUserTicket/:email",
  checkIfUserAuthenticated,
  checkIfUserAuthorized,
  asyncHandler(getUserAllTicket)
);

export default userRouter;
