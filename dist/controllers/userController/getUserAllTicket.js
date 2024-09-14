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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAllTicket = getUserAllTicket;
const connect_1 = require("$/db/connect");
const schema_1 = require("$/db/schema");
const drizzle_orm_1 = require("drizzle-orm");
function getUserAllTicket(req, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.params;
        console.log(email);
        const profile = yield connect_1.db.query.userSchema.findFirst({
            columns: { password: false, createdAt: false, role: false },
            where: (0, drizzle_orm_1.eq)(schema_1.userSchema.email, email),
            with: {
                ticketsThisUserPurchased: true
            }
        });
        response.status(200).json({ profile });
    });
}
