import { db } from "$/db/connect";
import { orderSchema } from "$/db/schema";
import ErrorHandler from "$/utils/errorHandler";
import { eq } from "drizzle-orm";
import { type Request, type Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: "2024-06-20"
});

interface RequestBody {
    orderId: number;
}

export async function stripePayment(
    request: Request<object, object, RequestBody, object>,
    _response: Response
): Promise<void> {
    const { orderId } = request.body;

    const order = await db.query.orderSchema.findFirst({
        where: eq(orderSchema.id, orderId),
        columns: { price: true },
        with: {
            userWhoPaid: { columns: { email: true } },
            EventPaidFor: { columns: { name: true } }
        }
    });

    if (!order) {
        throw new ErrorHandler("Order not found", 404);
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: order?.userWhoPaid.email,
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: order?.EventPaidFor.name
                    },
                    unit_amount: order.price! * 100
                }
            }
        ]
        // success_url: "http://localhost:5173/success",
        // cancel_url: "http://localhost:5173/cancel"
    });
    console.log(session);
}
