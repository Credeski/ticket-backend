import { db } from "$/db/connect";
import { userSchema } from "$/db/schema";
import { eq } from "drizzle-orm";
import { type Request, type Response } from "express";

interface Email {
  email?: string;
}

export async function getUserProfile(
  req: Request<Email, object, object, object>,
  response: Response
): Promise<void> {
  const { email } = req.params;
  const profile = await db.query.userSchema.findFirst({
    columns: { password: false },
    where: eq(userSchema.email, email!),
    with: {
      eventsTheUserRegisteredFor: true,
      ticketsThisUserPurchased: true,
      orderTheUserOrdered: true,
      paymentsTheUserHasMade: true
    }
  });
  response.status(200).json({ profile });
}
