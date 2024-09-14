"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRelations = exports.EventSchema = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = require("./user");
const order_1 = require("./order");
const payment_1 = require("./payment");
exports.EventSchema = (0, pg_core_1.pgTable)("event", {
    id: (0, pg_core_1.serial)("id").notNull().primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    description: (0, pg_core_1.varchar)("description", { length: 255 }).notNull(),
    location: (0, pg_core_1.varchar)("location", { length: 255 }).notNull(),
    availableCount: (0, pg_core_1.integer)("available_count").notNull(),
    fullCount: (0, pg_core_1.integer)("full_count").notNull(),
    eventStartDate: (0, pg_core_1.timestamp)("date", { mode: "string" }).notNull(),
    organizerId: (0, pg_core_1.integer)("organizer_id")
        .references(() => user_1.userSchema.id)
        .notNull()
});
exports.eventRelations = (0, drizzle_orm_1.relations)(exports.EventSchema, ({ one, many }) => ({
    userWhoCreated: one(user_1.userSchema, {
        fields: [exports.EventSchema.organizerId],
        references: [user_1.userSchema.id]
    }),
    OrdersForTheEvent: many(order_1.orderSchema),
    PaymentForTheEvent: many(payment_1.paymentSchema)
}));
