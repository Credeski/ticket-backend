import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { loginUser } from "$/controllers/userController";

// Create a separate test app that doesn't start a server
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define your routes directly in the test (or import them)
app.post("/api/login", loginUser)

describe("POST /api/login", () => {
  it("should login successfully with correct credentials", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({
        email: "test@example.com",
        password: "correctpassword"
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.userId).toBe(1);
  });

  it("should fail with incorrect credentials", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({
        email: "test@example.com",
        password: "wrongpassword"
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid email or password.");
  });

  it("should fail when email or password is missing", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({
        email: "",
        password: ""
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Email and password are required.");
  });
});
