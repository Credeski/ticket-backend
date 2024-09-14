"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ticketController_1 = require("../controllers/ticketController");
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const isUserAuthenticated_1 = require("../middlewares/isUserAuthenticated");
const express_1 = require("express");
const ticketRouter = (0, express_1.Router)();
ticketRouter.post("/getTicket/:eventId/:userId", isUserAuthenticated_1.checkIfUserAuthenticated, (0, catchAsyncErrors_1.default)(ticketController_1.getTicket));
exports.default = ticketRouter;
