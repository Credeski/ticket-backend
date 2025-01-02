import { sendTheEmail } from "$/utils/email/emailTransport";
import { type Request, type Response } from "express";
import { type OrderParams } from "./middleware/checkIfEmailExist";

export async function orderDeclinedEmail(
  request: Request<OrderParams, object, object, object>,
  response: Response
): Promise<void> {
  const { email } = request.params;
  const message = `Your order is declined`;

  await sendTheEmail({
    email: email!,
    subject: "Order declined",
    html: message
  });
  response.status(200).json({ message: "Order Recieved" });
}
