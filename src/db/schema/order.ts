import { relations } from "drizzle-orm";
import {
    integer,
    pgEnum,
    pgTable,
    serial,
    timestamp
} from "drizzle-orm/pg-core";
import { userSchema } from "./user";
import { EventSchema } from "./event";
import { TicketSchema } from "./ticket";

export const orderState = ["pending", "paid", "cancelled"] as const;
export const orderEnum = pgEnum("status", orderState);

export const orderSchema = pgTable("order", {
    id: serial("id").notNull().primaryKey(),
    // quantity: integer("quantity").notNull(),
    price: integer("price").notNull(),
    status: orderEnum("order_status").notNull(),
    date: timestamp("date", { mode: "string" }).notNull().defaultNow(),
    userId: integer("user_id")
        .references(() => userSchema.id)
        .notNull(),
    eventId: integer("event_id")
        .references(() => EventSchema.id)
        .notNull(),
    ticketId: integer("ticket_id")
        .references(() => TicketSchema.id)
        .notNull()
});

export const orderRelations = relations(orderSchema, ({ one }) => ({
    userWhoPaid: one(userSchema, {
        fields: [orderSchema.userId],
        references: [userSchema.id]
    }),
    EventPaidFor: one(EventSchema, {
        fields: [orderSchema.eventId],
        references: [EventSchema.id]
    }),
    OrderTicket: one(TicketSchema, {
        fields: [orderSchema.ticketId],
        references: [TicketSchema.id]
    })
}));

export type SelectOrder = typeof orderSchema.$inferSelect;
export type InsertOrder = typeof orderSchema.$inferInsert;
