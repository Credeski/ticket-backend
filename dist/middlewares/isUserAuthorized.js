"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserAuthorized = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const checkIfUserAuthorized = (request, _response, next) => {
    if (!request.role) {
        return next(new errorHandler_1.default("Unauthorized", 401));
    }
    if (request.role === "admin") {
        next();
    }
};
exports.checkIfUserAuthorized = checkIfUserAuthorized;
