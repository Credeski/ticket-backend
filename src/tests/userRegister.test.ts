import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { registerUser } from "$/controllers/userController";
import asyncHandler from "$/middlewares/catchAsyncErrors";
import { signUpSchema } from "$/zod-schemas/RegisterSchema";
import { z } from "zod";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.post("/api/user/register", asyncHandler(registerUser));

// const generateUniqueEmail = (): string => {
//     const randomPart = Math.random().toString(36).substring(2, 15); // Generates a random string
//     const timestamp = Date.now(); // Adds a timestamp to reduce chances of collisions
//     return `user_${randomPart}_${timestamp}@example.com`;
// };

// const gets = generateUniqueEmail();

describe("POST /api/user/register", () => {
    it("Check if request body is empty", async () => {
        const response = await request(app).post("/api/user/register").send({});

        try {
            signUpSchema.parse(response.body);
            // const { email, password, fullName, role } = validatedData;
            // signUpSchema.parse(invalidData);
        } catch (error) {
            expect(error).toBeInstanceOf(z.ZodError);
            expect((error as z.ZodError).issues[0].message).toBe("Required");
        }
    });
    it("should check if user has an account before testing", async () => {
        const response = await request(app).post("/api/user/register").send({
            email: "ibuemmanuel60@gmail.com",
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
            email: "fuckoff@gmail.com",
            // email: gets,
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
    it("should check if the email is valid email", async () => {
        const response = await request(app).post("/api/user/register").send({
            email: "ibuemmanuelcom",
            password: "Freakaziod1#",
            fullName: "IbuEmmanuel",
            role: "admin",
            mode: "signUp"
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body).toHaveProperty("details");
        expect(response.body.details).toHaveProperty("email");
        expect(response.body.details.email).toEqual(
            expect.arrayContaining(["Invalid email format"])
        );
    });
    it("should check if user body role does not match admin or user", async () => {
        const response = await request(app).post("/api/user/register").send({
            email: "ibuemmanuel60@gmail.com",
            password: "Freakaziod1#",
            fullName: "IbuEmmanuel",
            role: "adminssd",
            mode: "signUp"
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body).toHaveProperty("details");
        expect(response.body.details).toHaveProperty("role");
        expect(response.body.details.role).toEqual(
            expect.arrayContaining(["Role must be either 'admin' or 'user'."])
        );
    });
    it("should check if it a valid password to use", async () => {
        const response = await request(app).post("/api/user/register").send({
            email: "ibuemmanuel60@gmail.com",
            password: "Freakaziod",
            fullName: "IbuEmmanuel",
            role: "admin",
            mode: "signUp"
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body).toHaveProperty("details");
        expect(response.body.details).toHaveProperty("password");
        expect(response.body.details.password).toEqual(
            expect.arrayContaining([
                "Password must contain at least one number.",
                "Password must contain at least one special character."
            ])
        );
    });
});
