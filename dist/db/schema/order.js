"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRelations = exports.orderSchema = exports.orderEnum = exports.orderState = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = require("./user");
const event_1 = require("./event");
const ticket_1 = require("./ticket");
exports.orderState = ["pending", "paid", "cancelled"];
exports.orderEnum = (0, pg_core_1.pgEnum)("status", exports.orderState);
exports.orderSchema = (0, pg_core_1.pgTable)("order", {
    id: (0, pg_core_1.serial)("id").notNull().primaryKey(),
    // quantity: integer("quantity").notNull(),
    price: (0, pg_core_1.integer)("price").notNull(),
    status: (0, exports.orderEnum)("order_status").notNull(),
    date: (0, pg_core_1.timestamp)("date", { mode: "string" }).notNull().defaultNow(),
    userId: (0, pg_core_1.integer)("user_id")
        .references(() => user_1.userSchema.id)
        .notNull(),
    eventId: (0, pg_core_1.integer)("event_id")
        .references(() => event_1.EventSchema.id)
        .notNull(),
    ticketId: (0, pg_core_1.integer)("ticket_id")
        .references(() => ticket_1.TicketSchema.id)
        .notNull()
});
exports.orderRelations = (0, drizzle_orm_1.relations)(exports.orderSchema, ({ one }) => ({
    userWhoPaid: one(user_1.userSchema, {
        fields: [exports.orderSchema.userId],
        references: [user_1.userSchema.id]
    }),
    EventPaidFor: one(event_1.EventSchema, {
        fields: [exports.orderSchema.eventId],
        references: [event_1.EventSchema.id]
    }),
    OrderTicket: one(ticket_1.TicketSchema, {
        fields: [exports.orderSchema.ticketId],
        references: [ticket_1.TicketSchema.id]
    })
}));
