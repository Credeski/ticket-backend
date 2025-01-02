import express, { type Request, type Response } from "express";
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

export const app = express();
const PORT = 5002;
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: "http://localhost:3000" }));
// i used JSON parser for all non-webhook routes so had to create a custom middleware
app.use(jsonParser);

process.on("uncaughtException", (err) => {
  console.log(`Error: $err: ${err.message}`);
  console.log(`Shutting down the server due to uncaught Expectation`);
  process.exit(1);
});

app.get("/", (_req: Request, res: Response) => res.send("Hello World!"));

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
