"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const stripePayment_1 = require("../stripePayment");
const isUserAuthenticated_1 = require("../middlewares/isUserAuthenticated");
const express_1 = require("express");
const stripeRouter = (0, express_1.Router)();
stripeRouter.post("/", isUserAuthenticated_1.checkIfUserAuthenticated, (0, catchAsyncErrors_1.default)((0, catchAsyncErrors_1.default)(stripePayment_1.stripePayment)));
exports.default = stripeRouter;
