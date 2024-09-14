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
exports.orderConfirmedEmail = orderConfirmedEmail;
const emailTransport_1 = require("$/utils/email/emailTransport");
function orderConfirmedEmail(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = request.params;
        const message = `Your order is confirmed`;
        yield (0, emailTransport_1.sendTheEmail)({
            email: email,
            subject: "Order confirmed",
            html: message
        });
        response.status(200).json({ message: "Order Recieved" });
    });
}
