"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const customError_1 = __importDefault(require("./middlewares/customError"));
const routes_1 = require("./routes");
const jsonParser_1 = require("./middlewares/jsonParser");
exports.app = (0, express_1.default)();
const PORT = 5002;
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
// i used JSON parser for all non-webhook routes so had to create a custom middleware
exports.app.use(jsonParser_1.jsonParser);
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    console.log(`Shutting down the server due to uncaught Expectation`);
    process.exit(1);
});
exports.app.get("/", (_req, res) => res.send("Hello World!"));
exports.app.use("/api/user", routes_1.userRouter);
exports.app.use("/api/event", routes_1.eventRouter);
exports.app.use("/api/ticket", routes_1.ticketRouter);
exports.app.use("/api/email", routes_1.sendEmailRouter);
exports.app.use("/api/checkout", routes_1.stripeRouter);
exports.app.use("/webhook", routes_1.webHookRouter);
exports.app.use("/refresh", routes_1.refreshTokenRouter);
// catch errors
exports.app.use(customError_1.default);
exports.app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
