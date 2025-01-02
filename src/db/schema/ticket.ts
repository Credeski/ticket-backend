import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp
} from "drizzle-orm/pg-core";
import { EventSchema } from "./event";
import { userSchema } from "./user";

export const ticketState = ["vip", "regular"] as const;
export const ticketEnum = pgEnum("ticketType", ticketState);

export const TicketSchema = pgTable("ticket", {
  id: serial("id").notNull().primaryKey(),
  ticketType: ticketEnum("ticketType").default("regular").notNull(),
  price: integer("price").notNull(),
  date: timestamp("date", { mode: "string" }).notNull().defaultNow(),
  eventId: integer("event_id")
    .references(() => EventSchema.id)
    .notNull(),
  userId: integer("user_id")
    .references(() => userSchema.id)
    .notNull()
});

export const ticketRelations = relations(TicketSchema, ({ one, many }) => ({
  userWhoPurchased: many(userSchema),
  ticketforthisevent: one(EventSchema, {
    fields: [TicketSchema.userId],
    references: [EventSchema.id]
  })
}));

export type SelectTicket = typeof TicketSchema.$inferSelect;
export type InsertTicket = typeof TicketSchema.$inferInsert;
