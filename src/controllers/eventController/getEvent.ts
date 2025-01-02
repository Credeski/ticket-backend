import { db } from "$/db/connect";
import { eq } from "drizzle-orm";
import { EventSchema } from "$/db/schema";
import { type Request, type Response } from "express";

interface ID {
  id?: number;
}

export async function getEvent(
  req: Request<ID, object, object, object>,
  response: Response
): Promise<void> {
  const { id } = req.params;
  // console.log(email);
  const event = await db.query.EventSchema.findFirst({
    where: eq(EventSchema.id, id!),
    with: {
      userWhoCreated: {
        columns: { id: true, email: true }
      }
    }
  });
  response.status(200).json({ event });
}
