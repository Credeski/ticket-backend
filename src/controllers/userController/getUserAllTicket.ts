import { db } from "$/db/connect";
import { userSchema } from "$/db/schema";
import { eq } from "drizzle-orm";
import { type Request, type Response } from "express";

interface Email {
  email?: string;
}

export async function getUserAllTicket(
  req: Request<Email, object, object, object>,
  response: Response
): Promise<void> {
  const { email } = req.params;
  console.log(email);
  const profile = await db.query.userSchema.findFirst({
    columns: { password: false, createdAt: false, role: false },
    where: eq(userSchema.email, email!),
    with: {
      ticketsThisUserPurchased: true
    }
  });
  response.status(200).json({ profile });
}
