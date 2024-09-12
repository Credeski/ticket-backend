import { type InferSelectModel, relations } from "drizzle-orm";
import {
    pgEnum,
    pgTable,
    serial,
    timestamp,
    varchar
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { TicketSchema } from "./ticket";
import { EventSchema } from "./event";
import { paymentSchema } from "./payment";
import { orderSchema } from "./order";

export const roleState = ["admin", "user"] as const;
export const roleEnum = pgEnum("role", roleState);

export const userSchema = pgTable("user", {
    id: serial("id").notNull().primaryKey(),
    fullName: varchar("full_Name", { length: 255 }).notNull(),
    role: roleEnum("role").default("user").notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    createdAt: timestamp("created_at", { mode: "string" })
        .notNull()
        .defaultNow()
});

export const userRelations = relations(userSchema, ({ many }) => ({
    ticketsThisUserPurchased: many(TicketSchema),
    eventsTheUserRegisteredFor: many(EventSchema),
    paymentsTheUserHasMade: many(paymentSchema),
    orderTheUserOrdered: many(orderSchema)
}));

const baseSchema = createInsertSchema(userSchema, {
    fullName: (schema) => schema.fullName.min(1),
    password: (schema) => schema.password.min(1),
    email: (schema) => schema.email.email(),
    role: (schema) =>
        schema.role.default("user").or(z.string().default("admin"))
}).pick({ fullName: true, password: true, email: true, role: true });

export const userSchemaZod = z.union([
    z.object({
        mode: z.literal("signUp"),
        email: baseSchema.shape.email,
        password: baseSchema.shape.password,
        fullName: baseSchema.shape.fullName,
        role: baseSchema.shape.role
    }),
    z.object({
        mode: z.literal("signIn"),
        email: baseSchema.shape.email,
        password: baseSchema.shape.password
    })
]);

export type UserSchema = z.infer<typeof userSchemaZod>;
export type SelectUserModel = InferSelectModel<typeof userSchema>;
