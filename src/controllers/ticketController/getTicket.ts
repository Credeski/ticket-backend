import { db } from "$/db/connect";
import { EventSchema, orderSchema, userSchema } from "$/db/schema";
import { TicketSchema, type InsertTicket } from "$/db/schema/ticket";
import { TicketPrice } from "$/utils/ticketPrices";
import axios from "axios";
import { eq } from "drizzle-orm";
import { type Request, type Response } from "express";

interface TicketParams {
  eventId?: number;
  userId?: number;
}

export async function getTicket(
  request: Request<TicketParams, object, InsertTicket, object>,
  response: Response
): Promise<void | Response> {
  const { eventId, userId } = request.params;
  const { ticketType } = request.body;
  const event = await db.query.EventSchema.findFirst({
    where: eq(EventSchema.id, eventId!)
  });

  if (event)
    if (event?.availableCount >= event?.fullCount) {
      return response.status(201).json({ message: "Event filled up already" });
    }

  const user = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.id, userId!))
    .then((users) => users[0]);

  await db.transaction(async (tx) => {
    const getTicket = await tx
      .insert(TicketSchema)
      .values({
        eventId: eventId!,
        price: TicketPrice[ticketType!],
        userId: userId!,
        ticketType
      })
      .returning();
    await tx.insert(orderSchema).values({
      eventId: eventId!,
      price: TicketPrice[ticketType!],
      ticketId: getTicket[0].id,
      userId: userId!,
      status: "pending"
    });
  });
  await axios.get(
    `http://localhost:5002/api/email/orderRecieved/${user.email}`
  );
  response.status(201).json({ message: "Ticket got successfully" });
}
