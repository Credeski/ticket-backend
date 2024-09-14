"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webhooks_1 = require("../webhooks");
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const webHookRouter = (0, express_1.Router)();
webHookRouter.post("/", 
// Stripe requires the raw body to construct the event
express_2.default.raw({ type: "application/json" }), webhooks_1.WebHooks);
exports.default = webHookRouter;
