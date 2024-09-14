"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const isUserAuthenticated_1 = require("../middlewares/isUserAuthenticated");
const isUserAuthorized_1 = require("../middlewares/isUserAuthorized");
const express_1 = require("express");
// import { createuser, getUsers, getUsersById } from "../handlers/users";
const userRouter = (0, express_1.Router)();
userRouter.post("/register", (0, catchAsyncErrors_1.default)(userController_1.registerUser));
userRouter.post("/login", (0, catchAsyncErrors_1.default)(userController_1.loginUser));
userRouter.get("/logout", (0, catchAsyncErrors_1.default)(userController_1.logout));
userRouter.get("/getUser/:email", isUserAuthenticated_1.checkIfUserAuthenticated, (0, catchAsyncErrors_1.default)(userController_1.getUserProfile));
userRouter.get("/getUserPayment/:email", isUserAuthenticated_1.checkIfUserAuthenticated, isUserAuthorized_1.checkIfUserAuthorized, (0, catchAsyncErrors_1.default)(userController_1.getUserAllPayment));
userRouter.get("/getUserTicket/:email", isUserAuthenticated_1.checkIfUserAuthenticated, isUserAuthorized_1.checkIfUserAuthorized, (0, catchAsyncErrors_1.default)(userController_1.getUserAllTicket));
exports.default = userRouter;
