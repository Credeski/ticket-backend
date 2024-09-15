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
exports.handleRefreshToken = void 0;
const connect_1 = require("../../db/connect");
const schema_1 = require("../../db/schema");
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const drizzle_orm_1 = require("drizzle-orm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.ticket))
        return res.sendStatus(401);
    const refreshToken = cookies.ticket;
    // if (!foundUser) return res.sendStatus(403); //unauthorized
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (!decoded) {
            return new errorHandler_1.default("Unauthorized", 403);
        }
        const findEmail = yield connect_1.db
            .select()
            .from(schema_1.userSchema)
            // @ts-expect-error  i can't extend the type of decoded so i had to ignore
            .where((0, drizzle_orm_1.eq)(schema_1.userSchema.email, decoded.email))
            .then((users) => users[0]);
        // @ts-expect-error  i can't extend the type of decoded so i had to ignore
        if (err || findEmail.email !== decoded.email)
            return new errorHandler_1.default("Unauthorized", 403);
        // const roles = Object.values(foundUser.roles);
        const accessToken = jsonwebtoken_1.default.sign({
            email: findEmail.email,
            role: findEmail.role
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
        res.json({ accessToken });
    }));
});
exports.handleRefreshToken = handleRefreshToken;
