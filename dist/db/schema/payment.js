"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRelations = exports.paymentSchema = exports.paymentEnum = exports.paymentState = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const order_1 = require("./order");
const user_1 = require("./user");
const event_1 = require("./event");
const ticket_1 = require("./ticket");
exports.paymentState = ["success", "failed"];
exports.paymentEnum = (0, pg_core_1.pgEnum)("status", exports.paymentState);
exports.paymentSchema = (0, pg_core_1.pgTable)("payment", {
    id: (0, pg_core_1.serial)("id").notNull().primaryKey(),
    orderId: (0, pg_core_1.integer)("order_id")
        .references(() => order_1.orderSchema.id)
        .notNull(),
    userId: (0, pg_core_1.integer)("user_id")
        .references(() => user_1.userSchema.id)
        .notNull(),
    eventId: (0, pg_core_1.integer)("event_id")
        .references(() => event_1.EventSchema.id)
        .notNull(),
    ticketId: (0, pg_core_1.integer)("ticket_id")
        .references(() => ticket_1.TicketSchema.id)
        .notNull(),
    amount: (0, pg_core_1.integer)("amount").notNull(),
    status: (0, exports.paymentEnum)("payment_status").notNull(),
    date: (0, pg_core_1.timestamp)("date", { mode: "string" }).notNull().defaultNow(),
    paymentMethod: (0, pg_core_1.varchar)("paymentMethod", { length: 255 }).notNull()
});
exports.paymentRelations = (0, drizzle_orm_1.relations)(exports.paymentSchema, ({ one }) => ({
    userWhoPaid: one(user_1.userSchema, {
        fields: [exports.paymentSchema.userId],
        references: [user_1.userSchema.id]
    }),
    EventPaidFor: one(event_1.EventSchema, {
        fields: [exports.paymentSchema.eventId],
        references: [event_1.EventSchema.id]
    }),
    EventTicket: one(ticket_1.TicketSchema, {
        fields: [exports.paymentSchema.ticketId],
        references: [ticket_1.TicketSchema.id]
    }),
    OrderIdForPayment: one(order_1.orderSchema, {
        fields: [exports.paymentSchema.orderId],
        references: [order_1.orderSchema.id]
    })
}));
