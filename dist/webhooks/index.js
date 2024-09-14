"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHooks = WebHooks;
const connect_1 = require("$/db/connect");
const schema_1 = require("$/db/schema");
const catchAsyncErrors_1 = __importDefault(require("$/middlewares/catchAsyncErrors"));
const stripePayment_1 = require("$/stripePayment");
const errorHandler_1 = __importDefault(require("$/utils/errorHandler"));
const axios_1 = __importDefault(require("axios"));
const drizzle_orm_1 = require("drizzle-orm");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
function WebHooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sig = req.headers["stripe-signature"];
        let event;
        // eslint-disable-next-line prefer-const
        event = stripePayment_1.stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        if (event.type === "payment_intent.succeeded") {
            const stripeObject = event.data
                .object;
            const email = stripeObject.receipt_email;
            try {
                yield connect_1.db.transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    const confirmOrder = yield tx
                        .update(schema_1.orderSchema)
                        .set({ status: "paid" })
                        .where((0, drizzle_orm_1.eq)(schema_1.orderSchema.id, parseInt(event.data.object.metadata.orderId)))
                        .returning();
                    yield tx
                        .update(schema_1.EventSchema)
                        .set({
                        availableCount: (0, drizzle_orm_1.sql) `${schema_1.EventSchema.availableCount} + ${1}`
                    })
                        .where((0, drizzle_orm_1.eq)(schema_1.EventSchema.id, confirmOrder[0].eventId));
                }));
            }
            catch (error) {
                new errorHandler_1.default(error, 500);
            }
            (0, catchAsyncErrors_1.default)(yield axios_1.default.get(`http://localhost:5002/api/email/orderConfirmed/${email}`));
        }
        if (event.type === "payment_intent.payment_failed") {
            const stripeObject = event.data
                .object;
            const email = stripeObject.receipt_email;
            try {
                yield connect_1.db
                    .update(schema_1.orderSchema)
                    .set({ status: "cancelled" })
                    .where((0, drizzle_orm_1.eq)(schema_1.orderSchema.id, parseInt(event.data.object.metadata.orderId)));
            }
            catch (error) {
                new errorHandler_1.default(error, 500);
            }
            (0, catchAsyncErrors_1.default)(yield axios_1.default.get(`http://localhost:5002/api/email/orderDeclined/${email}`));
        }
        return res.json({ received: true });
    });
}
