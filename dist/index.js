"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const customError_1 = __importDefault(require("./middlewares/customError"));
const routes_1 = require("./routes");
const jsonParser_1 = require("./middlewares/jsonParser");
const corsOption_1 = require("./corsss/corsOption");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)(corsOption_1.getCorsOptions));
// i used JSON parser for all non-webhook routes so had to create a custom middleware
app.use(jsonParser_1.jsonParser);
const PORT = 5002;
process.on("uncaughtException", (err) => {
    console.log(`Error: $err: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Expectation`);
    process.exit(1);
});
app.use("/api/user", routes_1.userRouter);
app.use("/api/event", routes_1.eventRouter);
app.use("/api/ticket", routes_1.ticketRouter);
app.use("/api/email", routes_1.sendEmailRouter);
app.use("/api/checkout", routes_1.stripeRouter);
app.use("/webhook", routes_1.webHookRouter);
app.use("/refresh", routes_1.refreshTokenRouter);
// catch errors
app.use(customError_1.default);
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
