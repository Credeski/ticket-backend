"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const setTokens = (user, res) => {
    const accessToken = jsonwebtoken_1.default.sign({
        email: user.email,
        role: user.role
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
    const refreshToken = jsonwebtoken_1.default.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
    res.cookie("ticket", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        // secure: true ,    taking it out for thunder client ,has issue with it
        maxAge: 24 * 60 * 60 * 1000
    });
    res.json({ user, accessToken });
};
exports.setTokens = setTokens;
