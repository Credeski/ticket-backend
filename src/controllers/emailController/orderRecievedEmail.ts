import { sendTheEmail } from "$/utils/email/emailTransport";
import { type Request, type Response } from "express";
import { type OrderParams } from "./middleware/checkIfEmailExist";



export async function orderRecievedEmail(
    request: Request<OrderParams, object, object, object>,
    response: Response
): Promise<void> {
    const { email } = request.params;
    const message = `Your order to get ticket to the event function has been recieved, you would recieve a confirmation message soon if your payment has been successful.`;

    await sendTheEmail({
        email: email!,
        subject: "Order recieved",
        html: message
    });
    response.status(200).json({ message: "Order Recieved" });
}
