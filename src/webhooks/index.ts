import { db } from "$/db/connect";
import { EventSchema, orderSchema } from "$/db/schema";
import asyncHandler from "$/middlewares/catchAsyncErrors";
import { stripe } from "$/stripePayment";
import ErrorHandler from "$/utils/errorHandler";
import axios from "axios";
import { eq, sql } from "drizzle-orm";
import { type Request, type Response } from "express";
import type Stripe from "stripe";

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

export async function WebHooks(
  req: Request,
  res: Response
): Promise<void | Response> {
  const sig = req.headers["stripe-signature"];

  let event: Stripe.Event;

  // eslint-disable-next-line prefer-const
  event = stripe.webhooks.constructEvent(req.body, sig!, webhookSecret);

  if (event.type === "payment_intent.succeeded") {
    const stripeObject: Stripe.PaymentIntent = event.data
      .object as Stripe.PaymentIntent;
    const email = stripeObject.receipt_email;

    try {
      await db.transaction(async (tx) => {
        const confirmOrder = await tx
          .update(orderSchema)
          .set({ status: "paid" })
          .where(
            eq(orderSchema.id, parseInt(event.data.object.metadata.orderId)!)
          )
          .returning();
        await tx
          .update(EventSchema)
          .set({
            availableCount: sql`${EventSchema.availableCount} + ${1}`
          })
          .where(eq(EventSchema.id, confirmOrder[0].eventId));
      });
    } catch (error: unknown) {
      new ErrorHandler(error as unknown as string, 500);
    }

    asyncHandler(
      await axios.get(`http://localhost:5002/api/email/orderConfirmed/${email}`)
    );
  }
  if (event.type === "payment_intent.payment_failed") {
    const stripeObject: Stripe.PaymentIntent = event.data
      .object as Stripe.PaymentIntent;
    const email = stripeObject.receipt_email;
    try {
      await db
        .update(orderSchema)
        .set({ status: "cancelled" })
        .where(
          eq(orderSchema.id, parseInt(event.data.object.metadata.orderId)!)
        );
    } catch (error: unknown) {
      new ErrorHandler(error as unknown as string, 500);
    }
    asyncHandler(
      await axios.get(`http://localhost:5002/api/email/orderDeclined/${email}`)
    );
  }

  return res.json({ received: true });
}
