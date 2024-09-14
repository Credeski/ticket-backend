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
exports.logout = logout;
function logout(req, res
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) {
    return __awaiter(this, void 0, void 0, function* () {
        const cookies = req.cookies;
        // Token was never there anyway lol
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.sendStatus(204);
        res.clearCookie("ticket-refresh", {
            httpOnly: true,
            sameSite: "none",
            secure: true
        }); // secure: true = only serves on http
        res.sendStatus(204);
    });
}
