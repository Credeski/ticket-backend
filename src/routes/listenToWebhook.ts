import { WebHooks } from "$/webhooks";
import { Router } from "express";
import express from "express";

const webHookRouter = Router();

webHookRouter.post(
    "/",
    // Stripe requires the raw body to construct the event
    express.raw({ type: "application/json" }),
    WebHooks
);

export default webHookRouter;
