// import { db } from "$/db/connect";
// import { orderSchema, userSchema } from "$/db/schema";
// import { sendTheEmail } from "$/utils/email/emailTransport";
// import { eq } from "drizzle-orm";
// import { type Request, type Response } from "express";

// type OrderParams = {
//     eventId: number;
//     userId: number;
//     ticketId: number;
//     price: number;
// };

// export async function makeOrder(
//     request: Request<OrderParams, object, object, object>,
//     response: Response
// ): Promise<void> {
//     const { eventId, price, ticketId, userId } = request.params;
//     await db
//         .insert(orderSchema)
//         .values({ eventId, price, ticketId, userId, status: "pending" });
//     const user = await db
//         .select()
//         .from(userSchema)
//         .where(eq(userSchema.id, userId))
//         .then((users) => users[0]);

//     const message = `Your order to get ticket to the event function has been recieved, you would recieve a confirmation message soon if your payment has been successful.`;

//     await sendTheEmail({
//         email: user.email,
//         subject: "Order has been recieved",
//         html: message
//     });
//     response.status(200).json({ message: "Order Recieved" });
// }
