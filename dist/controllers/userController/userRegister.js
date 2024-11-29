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
exports.registerUser = registerUser;
const connect_1 = require("../../db/connect");
const user_1 = require("../../db/schema/user");
const encryptPassword_1 = require("../../utils/encryptPassword");
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const RegisterSchema_1 = require("../../zod-schemas/RegisterSchema");
const drizzle_orm_1 = require("drizzle-orm");
const zod_1 = require("zod");
function registerUser(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validatedData = RegisterSchema_1.signUpSchema.parse(request.body);
            const { email, password, fullName, role } = validatedData;
            const encryptPass = yield (0, encryptPassword_1.encryptPassword)(password);
            const existingUser = yield connect_1.db
                .selectDistinct()
                .from(user_1.userSchema)
                .where((0, drizzle_orm_1.eq)(user_1.userSchema.email, email));
            if (existingUser.length > 0) {
                response.status(400).json({ message: "Email already registered" });
            }
            yield connect_1.db
                .insert(user_1.userSchema)
                .values({ email, fullName, password: encryptPass, role });
            response.status(200).json({ message: "User registered successfully!" });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                response.status(400).json({
                    // console.log()
                    error: "Validation failed",
                    details: error.flatten().fieldErrors
                });
            }
            else if (error instanceof Error) {
                console.error(error);
                return next(new errorHandler_1.default("Internal Service error", 500));
            }
            else {
                return next(new errorHandler_1.default("Unknown error occured", 500));
            }
        }
    });
}
