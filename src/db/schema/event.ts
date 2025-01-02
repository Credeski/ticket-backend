import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";
import { userSchema } from "./user";
import { orderSchema } from "./order";
import { paymentSchema } from "./payment";

export const EventSchema = pgTable("event", {
  id: serial("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  availableCount: integer("available_count").notNull(),
  fullCount: integer("full_count").notNull(),
  eventStartDate: timestamp("date", { mode: "string" }).notNull(),
  organizerId: integer("organizer_id")
    .references(() => userSchema.id)
    .notNull()
});

export const eventRelations = relations(EventSchema, ({ one, many }) => ({
  userWhoCreated: one(userSchema, {
    fields: [EventSchema.organizerId],
    references: [userSchema.id]
  }),
  OrdersForTheEvent: many(orderSchema),
  PaymentForTheEvent: many(paymentSchema)
}));

export type SelectEvent = typeof EventSchema.$inferSelect;
export type InsertEvent = typeof EventSchema.$inferInsert;
