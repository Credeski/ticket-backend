"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaZod = exports.userRelations = exports.userSchema = exports.roleEnum = exports.roleState = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
const ticket_1 = require("./ticket");
const event_1 = require("./event");
const payment_1 = require("./payment");
const order_1 = require("./order");
exports.roleState = ["admin", "user"];
exports.roleEnum = (0, pg_core_1.pgEnum)("role", exports.roleState);
exports.userSchema = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.serial)("id").notNull().primaryKey(),
    fullName: (0, pg_core_1.varchar)("full_Name", { length: 255 }).notNull(),
    role: (0, exports.roleEnum)("role").default("user").notNull(),
    password: (0, pg_core_1.varchar)("password", { length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull().unique(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "string" })
        .notNull()
        .defaultNow()
});
exports.userRelations = (0, drizzle_orm_1.relations)(exports.userSchema, ({ many }) => ({
    ticketsThisUserPurchased: many(ticket_1.TicketSchema),
    eventsTheUserRegisteredFor: many(event_1.EventSchema),
    paymentsTheUserHasMade: many(payment_1.paymentSchema),
    orderTheUserOrdered: many(order_1.orderSchema)
}));
const baseSchema = (0, drizzle_zod_1.createInsertSchema)(exports.userSchema, {
    fullName: (schema) => schema.fullName.min(1),
    password: (schema) => schema.password.min(1),
    email: (schema) => schema.email.email(),
    role: (schema) => schema.role.default("user").or(zod_1.z.string().default("admin"))
}).pick({ fullName: true, password: true, email: true, role: true });
exports.userSchemaZod = zod_1.z.union([
    zod_1.z.object({
        mode: zod_1.z.literal("signUp"),
        email: baseSchema.shape.email,
        password: baseSchema.shape.password,
        fullName: baseSchema.shape.fullName,
        role: baseSchema.shape.role
    }),
    zod_1.z.object({
        mode: zod_1.z.literal("signIn"),
        email: baseSchema.shape.email,
        password: baseSchema.shape.password
    })
]);
