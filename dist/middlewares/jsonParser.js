"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonParser = void 0;
const express_1 = __importDefault(require("express"));
const jsonParser = (request, response, next) => {
    if (request.originalUrl === "/webhook") {
        next();
    }
    else {
        express_1.default.json()(request, response, next);
    }
};
exports.jsonParser = jsonParser;
