import { db } from "$/db/connect";
import { eq } from "drizzle-orm";
import { EventSchema } from "$/db/schema";
import { type Request, type Response } from "express";

interface ID {
    id?: number;
}

export async function getPaymentForAnEvent(
    req: Request<ID, object, object, object>,
    response: Response
): Promise<void> {
    const { id } = req.params;
    const event = await db.query.EventSchema.findFirst({
        where: eq(EventSchema.id, id!),
        with: {
            PaymentForTheEvent: true
        }
    });
    response.status(200).json({ event });
}
