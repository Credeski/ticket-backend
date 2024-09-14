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
exports.stripe = void 0;
exports.stripePayment = stripePayment;
const connect_1 = require("$/db/connect");
const schema_1 = require("$/db/schema");
const errorHandler_1 = __importDefault(require("$/utils/errorHandler"));
const drizzle_orm_1 = require("drizzle-orm");
const stripe_1 = __importDefault(require("stripe"));
exports.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    typescript: true,
    apiVersion: "2024-06-20"
});
function stripePayment(request, _response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orderId } = request.body;
        const order = yield connect_1.db.query.orderSchema.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.orderSchema.id, orderId),
            columns: { price: true, id: true },
            with: {
                userWhoPaid: { columns: { email: true } },
                EventPaidFor: { columns: { name: true } }
            }
        });
        if (!order) {
            throw new errorHandler_1.default("Order not found", 404);
        }
        const session = yield exports.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_creation: "always",
            customer_email: order === null || order === void 0 ? void 0 : order.userWhoPaid.email,
            metadata: {
                orderId
            },
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: order === null || order === void 0 ? void 0 : order.EventPaidFor.name
                        },
                        unit_amount: order.price * 100
                    }
                }
            ]
            // success_url: "http://localhost:5173/success",
            // cancel_url: "http://localhost:5173/cancel"
        });
        console.log(session);
    });
}
