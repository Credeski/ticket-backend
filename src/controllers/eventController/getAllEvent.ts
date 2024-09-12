import { db } from "$/db/connect";
import { EventSchema } from "$/db/schema";
import { desc } from "drizzle-orm";
import { type Request, type Response } from "express";

export async function getAllEvent(
    _request: Request,
    response: Response
): Promise<void> {
                const allEvent = await db.query.EventSchema.findMany({
        orderBy: [desc(EventSchema.eventStartDate)],
        with: {
            userWhoCreated: {
                columns: { id: true, email: true }
            }
        }
    });
    response.status(200).json({ allEvent });
}
