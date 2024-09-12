import express from "express";
import customError from "./middlewares/customError";
import {
    eventRouter,
    sendEmailRouter,
    ticketRouter,
    userRouter
} from "./routes";
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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

// catch errors
app.use(customError);

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
