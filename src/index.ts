import express from "express";
import cors from "cors";
import customError from "./middlewares/customError";
import {
    eventRouter,
    refreshTokenRouter,
    sendEmailRouter,
    stripeRouter,
    ticketRouter,
    userRouter,
    webHookRouter
} from "./routes";
import { jsonParser } from "./middlewares/jsonParser";
import { getCorsOptions } from "./corsss/corsOption";

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(cors(getCorsOptions));
// i used JSON parser for all non-webhook routes so had to create a custom middleware
app.use(jsonParser);
const PORT = 5002;

process.on("uncaughtException", (err) => {
    console.log(`Error: $err: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Expectation`);
    process.exit(1);
});

app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/email", sendEmailRouter);
app.use("/api/checkout", stripeRouter);
app.use("/webhook", webHookRouter);
app.use("/refresh", refreshTokenRouter);

// catch errors
app.use(customError);

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
