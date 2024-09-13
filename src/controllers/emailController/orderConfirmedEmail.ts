import { sendTheEmail } from "$/utils/email/emailTransport";
import { type Request, type Response } from "express";

type OrderParams = {
    email?: string;
};

export async function orderConfirmedEmail(
    request: Request<OrderParams, object, object, object>,
    response: Response
): Promise<void> {
    const { email } = request.params;
    const message = `Your order is confirmed`;

    await sendTheEmail({
        email: email!,
        subject: "Order confirmed",
        html: message
    });
    response.status(200).json({ message: "Order Recieved" });
}
