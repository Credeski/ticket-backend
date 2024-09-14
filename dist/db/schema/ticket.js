"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketRelations = exports.TicketSchema = exports.ticketEnum = exports.ticketState = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const event_1 = require("./event");
const user_1 = require("./user");
exports.ticketState = ["vip", "regular"];
exports.ticketEnum = (0, pg_core_1.pgEnum)("ticketType", exports.ticketState);
exports.TicketSchema = (0, pg_core_1.pgTable)("ticket", {
    id: (0, pg_core_1.serial)("id").notNull().primaryKey(),
    ticketType: (0, exports.ticketEnum)("ticketType").default("regular").notNull(),
    price: (0, pg_core_1.integer)("price").notNull(),
    date: (0, pg_core_1.timestamp)("date", { mode: "string" }).notNull().defaultNow(),
    eventId: (0, pg_core_1.integer)("event_id")
        .references(() => event_1.EventSchema.id)
        .notNull(),
    userId: (0, pg_core_1.integer)("user_id")
        .references(() => user_1.userSchema.id)
        .notNull()
});
exports.ticketRelations = (0, drizzle_orm_1.relations)(exports.TicketSchema, ({ one, many }) => ({
    userWhoPurchased: many(user_1.userSchema),
    ticketforthisevent: one(event_1.EventSchema, {
        fields: [exports.TicketSchema.userId],
        references: [event_1.EventSchema.id]
    })
}));
