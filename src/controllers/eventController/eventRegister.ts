import { db } from "$/db/connect";
import { EventSchema, type InsertEvent } from "$/db/schema/event";
import { type Request, type Response } from "express";

export async function registerEvent(
    request: Request<object, object, InsertEvent, object>,
    response: Response
): Promise<void> {
    const {
        name,
        description,
        location,
        organizerId,
        eventStartDate,
        availableCount,
        fullCount
    } = request.body;

    await db.insert(EventSchema).values({
        name,
        availableCount,
        fullCount,
        description,
        location,
        organizerId,
        eventStartDate
    });

    response.status(201).json({ message: "Event created successfully!" });
}
