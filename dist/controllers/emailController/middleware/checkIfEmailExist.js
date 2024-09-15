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
exports.checkIfUserAccountExist = void 0;
const connect_1 = require("../../../db/connect");
const schema_1 = require("../../../db/schema");
const errorHandler_1 = __importDefault(require("../../../utils/errorHandler"));
const drizzle_orm_1 = require("drizzle-orm");
const checkIfUserAccountExist = (request, _response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = request.params;
    const user = yield connect_1.db
        .select()
        .from(schema_1.userSchema)
        .where((0, drizzle_orm_1.eq)(schema_1.userSchema.email, email))
        .then((users) => users[0]);
    if (!user) {
        return new errorHandler_1.default("User not found", 404);
    }
    next();
});
exports.checkIfUserAccountExist = checkIfUserAccountExist;
