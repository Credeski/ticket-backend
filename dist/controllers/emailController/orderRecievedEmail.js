"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRecievedEmail = orderRecievedEmail;
const emailTransport_1 = require("../../utils/email/emailTransport");
function orderRecievedEmail(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = request.params;
        const message = `Your order to get ticket to the event function has been recieved, you would recieve a confirmation message soon if your payment has been successful.`;
        yield (0, emailTransport_1.sendTheEmail)({
            email: email,
            subject: "Order recieved",
            html: message
        });
        response.status(200).json({ message: "Order Recieved" });
    });
}
