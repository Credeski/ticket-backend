"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserAuthenticated = void 0;
// import ErrorHandler from "../utils/errorHandler";
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkIfUserAuthenticated = (request, _response, next) => {
    const authHeader = request.header("authorization");
    if (!authHeader) {
        throw new errorHandler_1.default("Please Login to access this resource / No Authorization token present", 401);
    }
    const token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
            throw new errorHandler_1.default("Token is inavlid", 403); //forbidded (invalid token)
        // @ts-expect-error  i can't extend the type of decoded so i had to ignore
        request.role = decoded === null || decoded === void 0 ? void 0 : decoded.role;
        next();
    });
    // const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    // // @ts-expect-error  i can't extend the type of decoded so i had to ignore
    // request.role = decodedData.role;
    // next();
};
exports.checkIfUserAuthenticated = checkIfUserAuthenticated;
