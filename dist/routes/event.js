"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventController_1 = require("$/controllers/eventController");
const catchAsyncErrors_1 = __importDefault(require("$/middlewares/catchAsyncErrors"));
const isUserAuthenticated_1 = require("$/middlewares/isUserAuthenticated");
const isUserAuthorized_1 = require("$/middlewares/isUserAuthorized");
const express_1 = require("express");
const eventRouter = (0, express_1.Router)();
eventRouter.post("/registerEvent", isUserAuthenticated_1.checkIfUserAuthenticated, isUserAuthorized_1.checkIfUserAuthorized, (0, catchAsyncErrors_1.default)(eventController_1.registerEvent));
eventRouter.get("/getEvent/:id", isUserAuthenticated_1.checkIfUserAuthenticated, (0, catchAsyncErrors_1.default)(eventController_1.getEvent));
eventRouter.get("/getPaymentForEvent/:id", isUserAuthenticated_1.checkIfUserAuthenticated, isUserAuthorized_1.checkIfUserAuthorized, (0, catchAsyncErrors_1.default)(eventController_1.getPaymentForAnEvent));
eventRouter.get("/getAllEvent", (0, catchAsyncErrors_1.default)(eventController_1.getAllEvent));
exports.default = eventRouter;
