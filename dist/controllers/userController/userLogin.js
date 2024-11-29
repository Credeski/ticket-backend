"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
const connect_1 = require("../../db/connect");
const user_1 = require("../../db/schema/user");
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const token_1 = require("../../utils/token");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const drizzle_orm_1 = require("drizzle-orm");
function loginUser(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = request.body;
        if (!email || !password) {
            response
                .status(400)
                .json({ message: "Email and Password are required!" });
        }
        const user = yield connect_1.db
            .selectDistinct()
            .from(user_1.userSchema)
            .where((0, drizzle_orm_1.eq)(user_1.userSchema.email, email));
        if (!user) {
            return next(new errorHandler_1.default("Invalid Email/Password", 400));
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user[0].password);
        if (!isPasswordValid) {
            response.status(400).json({ message: "Invalid Email/Password" });
        }
        (0, token_1.setTokens)(user[0], response);
        // response.status(200).json({ message: "Login successful!" });
    });
}
