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
exports.getAllEvent = getAllEvent;
const connect_1 = require("../../db/connect");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
function getAllEvent(_request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const allEvent = yield connect_1.db.query.EventSchema.findMany({
            orderBy: [(0, drizzle_orm_1.desc)(schema_1.EventSchema.eventStartDate)],
            with: {
                userWhoCreated: {
                    columns: { id: true, email: true }
                }
            }
        });
        response.status(200).json({ allEvent });
    });
}
