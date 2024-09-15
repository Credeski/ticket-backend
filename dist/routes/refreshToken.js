"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const refreshTokenController_1 = require("../controllers/refreshTokenController");
const refreshTokenRouter = (0, express_1.Router)();
refreshTokenRouter.get("/", (0, catchAsyncErrors_1.default)(refreshTokenController_1.handleRefreshToken));
exports.default = refreshTokenRouter;
