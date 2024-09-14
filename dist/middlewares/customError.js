"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
// Error-handling middleware function
const customError = (err, _req, res, _next) => {
    console.log("error::", err.code, err.name, err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    // if (err.name === "ZodError") {
    // }
    //   neon database error
    if (err.name === "NeonDbError") {
        if (err.code === 23505) {
            const message = err.detail;
            err = new errorHandler_1.default(message, 400);
        }
        if (err.code == undefined) {
            const message = `Error connecting to database: fetch failed`;
            err = new errorHandler_1.default(message, 500);
        }
    }
    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again`;
        err = new errorHandler_1.default(message, 400);
    }
    // JWT expired error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is expired, Try again`;
        err = new errorHandler_1.default(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
exports.default = customError;
