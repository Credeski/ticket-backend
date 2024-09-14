"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderRecievedEmail_1 = require("$/controllers/emailController/orderRecievedEmail");
const catchAsyncErrors_1 = __importDefault(require("$/middlewares/catchAsyncErrors"));
const orderConfirmedEmail_1 = require("$/controllers/emailController/orderConfirmedEmail");
const orderDeclinedEmail_1 = require("$/controllers/emailController/orderDeclinedEmail");
const sendEmailRouter = (0, express_1.Router)();
sendEmailRouter.get("/orderRecieved/:email", (0, catchAsyncErrors_1.default)(orderRecievedEmail_1.orderRecievedEmail));
sendEmailRouter.get("/orderConfirmed/:email", (0, catchAsyncErrors_1.default)(orderConfirmedEmail_1.orderConfirmedEmail));
sendEmailRouter.get("/orderDeclined/:email", (0, catchAsyncErrors_1.default)(orderDeclinedEmail_1.orderDeclinedEmail));
exports.default = sendEmailRouter;
