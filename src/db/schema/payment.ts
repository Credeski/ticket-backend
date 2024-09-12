import { relations } from "drizzle-orm";
import {
    integer,
    pgEnum,
    pgTable,
    serial,
    timestamp,
    varchar
} from "drizzle-orm/pg-core";
import { orderSchema } from "./order";
import { userSchema } from "./user";
import { EventSchema } from "./event";
import { TicketSchema } from "./ticket";

export const paymentState = ["success", "failed"] as const;
export const paymentEnum = pgEnum("status", paymentState);

export const paymentSchema = pgTable("payment", {
    id: serial("id").notNull().primaryKey(),    orderId: integer("order_id")
        .references(() => orderSchema.id)
        .notNull(),
    userId: integer("user_id")
        .references(() => userSchema.id)
        .notNull(),
    eventId: integer("event_id")
        .references(() => EventSchema.id)
        .notNull(),
    ticketId: integer("ticket_id")
        .references(() => TicketSchema.id)
        .notNull(),
    amount: integer("amount").notNull(),
    status: paymentEnum("payment_status").notNull(),
    date: timestamp("date", { mode: "string" }).notNull().defaultNow(),
    paymentMethod: varchar("paymentMethod", { length: 255 }).notNull()
});

export const paymentRelations = relations(paymentSchema, ({ one }) => ({
    userWhoPaid: one(userSchema, {
        fields: [paymentSchema.userId],
        references: [userSchema.id]
    }),
    EventPaidFor: one(EventSchema, {
        fields: [paymentSchema.eventId],
        references: [EventSchema.id]
    }),
    EventTicket: one(TicketSchema, {
        fields: [paymentSchema.ticketId],
        references: [TicketSchema.id]
    }),
    OrderIdForPayment: one(orderSchema, {
        fields: [paymentSchema.orderId],
        references: [orderSchema.id]
    })
}));

export type SelectPayment = typeof paymentSchema.$inferSelect;
export type InsertPayment = typeof paymentSchema.$inferInsert;
