import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { loginUser } from "$/controllers/userController";
import asyncHandler from "$/middlewares/catchAsyncErrors";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.post("/api/user/login", asyncHandler(loginUser));

describe("POST /api/user/login", () => {
    it("should login successfully with correct credentials", async () => {
        const response = await request(app).post("/api/user/login").send({
            email: "ibuemmanuel60@gmail.com",
            password: "Freakaziod1#"
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("user");
        expect(response.body).toHaveProperty("accessToken");
    });

    it("should fail with incorrect credentials", async () => {
        const response = await request(app).post("/api/user/login").send({
            email: "ibuemmanuel60@gmail.com",
            password: "Freakaziod"
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toContain("Invalid Email/Password");
    });

    it("should fail when email or password is missing", async () => {
        const response = await request(app).post("/api/user/login").send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toContain(
            "Email and Password are required!"
        );
    });
});
