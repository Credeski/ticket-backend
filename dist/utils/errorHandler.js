"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message); // Call the parent class's constructor
        this.statusCode = statusCode; // Set the statusCode property
        // Capture the stack trace (excluding the constructor function from it)
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorHandler; // Use ES module export syntax
