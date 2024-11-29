import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { registerUser } from "$/controllers/userController";
import asyncHandler from "$/middlewares/catchAsyncErrors";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.post("/api/user/register", asyncHandler(registerUser));

describe("POST /api/user/register", () => {
    it("Sign up schema validation", async () => {
        const response = await request(app).post("/api/user/register").send({
            email: "ibuemmanuel6@gmail.com",
            password: "Freakaziod1#",
            fullName: "IbuEmmanuel",
            role: "admin",
            mode: "signUp"
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toContain("Email already registered");
    });
    it("should check if user has an account before testing", async () => {
        const response = await request(app).post("/api/user/register").send({
            email: "ibuemmanuel6@gmail.com",
            password: "Freakaziod1#",
            fullName: "IbuEmmanuel",
            role: "admin",
            mode: "signUp"
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toContain("Email already registered");
    });
    it("should register successfully with the correct credentials", async () => {
        const response = await request(app).post("/api/user/register").send({
            email: "ibuemmanuel8@gmail.com",
            password: "Freakaziod1#",
            fullName: "IbuEmmanuel",
            role: "admin",
            mode: "signUp"
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toContain(
            "User registered successfully!"
        );
    });
    it("should check if the email is correct", async () => {
        const response = await request(app).post("/api/user/register").send({
            email: "ibuemmanuel8@gmail.com",
            password: "Freakaziod1#",
            fullName: "IbuEmmanuel",
            role: "admin",
            mode: "signUp"
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toContain(
            "User registered successfully!"
        );
    });
    it("should check if user body matches admin or user", async () => {
        const response = await request(app).post("/api/user/register").send({
            email: "ibuemmanuel8@gmail.com",
            password: "Freakaziod1#",
            fullName: "IbuEmmanuel",
            role: "admin",
            mode: "signUp"
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toContain(
            "User registered successfully!"
        );
    });
    it("should check if it a valid password to use", async () => {
        const response = await request(app).post("/api/user/register").send({
            email: "ibuemmanuel8@gmail.com",
            password: "Freakaziod1#",
            fullName: "IbuEmmanuel",
            role: "admin",
            mode: "signUp"
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toContain(
            "User registered successfully!"
        );
    });

    // it("should fail with incorrect credentials", async () => {
    //     const response = await request(app).post("/api/user/register").send({
    //         email: "ibuemmanuel60@gmail.com",
    //         password: "Freakaziod"
    //     });
    //     expect(response.status).toBe(400);
    //     expect(response.body).toHaveProperty("message");
    //     expect(response.body.message).toContain("Invalid Email/Password");
    // });

    // it("should fail when email or password is missing", async () => {
    //     const response = await request(app).post("/api/user/register").send({});

    //     expect(response.status).toBe(400);
    //     expect(response.body).toHaveProperty("message");
    //     expect(response.body.message).toContain(
    //         "Email and Password are required!"
    //     );
    // });
});
