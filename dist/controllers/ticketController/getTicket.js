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
exports.getTicket = getTicket;
const connect_1 = require("../../db/connect");
const schema_1 = require("../../db/schema");
const ticket_1 = require("../../db/schema/ticket");
const ticketPrices_1 = require("../../utils/ticketPrices");
const axios_1 = __importDefault(require("axios"));
const drizzle_orm_1 = require("drizzle-orm");
function getTicket(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { eventId, userId } = request.params;
        const { ticketType } = request.body;
        const event = yield connect_1.db.query.EventSchema.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.EventSchema.id, eventId)
        });
        if (event)
            if ((event === null || event === void 0 ? void 0 : event.availableCount) >= (event === null || event === void 0 ? void 0 : event.fullCount)) {
                return response
                    .status(201)
                    .json({ message: "Event filled up already" });
            }
        const user = yield connect_1.db
            .select()
            .from(schema_1.userSchema)
            .where((0, drizzle_orm_1.eq)(schema_1.userSchema.id, userId))
            .then((users) => users[0]);
        yield connect_1.db.transaction((tx) => __awaiter(this, void 0, void 0, function* () {
            const getTicket = yield tx
                .insert(ticket_1.TicketSchema)
                .values({
                eventId: eventId,
                price: ticketPrices_1.TicketPrice[ticketType],
                userId: userId,
                ticketType
            })
                .returning();
            yield tx.insert(schema_1.orderSchema).values({
                eventId: eventId,
                price: ticketPrices_1.TicketPrice[ticketType],
                ticketId: getTicket[0].id,
                userId: userId,
                status: "pending"
            });
        }));
        yield axios_1.default.get(`http://localhost:5002/api/email/orderRecieved/${user.email}`);
        response.status(201).json({ message: "Ticket got successfully" });
    });
}
