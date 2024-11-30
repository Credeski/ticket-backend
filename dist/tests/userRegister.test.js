"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const userController_1 = require("../controllers/userController");
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const RegisterSchema_1 = require("../zod-schemas/RegisterSchema");
const zod_1 = require("zod");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.post("/api/user/register", (0, catchAsyncErrors_1.default)(userController_1.registerUser));
(0, globals_1.describe)("POST /api/user/register", () => {
    (0, globals_1.it)("Check if request body is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/api/user/register").send({});
        try {
            RegisterSchema_1.signUpSchema.parse(response.body);
            // const { email, password, fullName, role } = validatedData;
            // signUpSchema.parse(invalidData);
        }
        catch (error) {
            (0, globals_1.expect)(error).toBeInstanceOf(zod_1.z.ZodError);
            (0, globals_1.expect)(error.issues[0].message).toBe("Required");
        }
    }));
    (0, globals_1.it)("should check if user has an account before testing", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/api/user/register").send({
            email: "ibuemmanuel6@gmail.com",
            password: "Freakaziod1#",
            fullName: "IbuEmmanuel",
            role: "admin",
            mode: "signUp"
        });
        (0, globals_1.expect)(response.status).toBe(400);
        (0, globals_1.expect)(response.body).toHaveProperty("message");
        (0, globals_1.expect)(response.body.message).toContain("Email already registered");
    }));
    (0, globals_1.it)("should register successfully with the correct credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/api/user/register").send({
            email: "ibuemmanuel8@gmail.com",
            password: "Freakaziod1#",
            fullName: "IbuEmmanuel",
            role: "admin",
            mode: "signUp"
        });
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toHaveProperty("message");
        (0, globals_1.expect)(response.body.message).toContain("User registered successfully!");
    }));
    (0, globals_1.it)("should check if the email is valid email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/api/user/register").send({
            email: "ibuemmanuelcom",
            password: "Freakaziod1#",
            fullName: "IbuEmmanuel",
            role: "admin",
            mode: "signUp"
        });
        (0, globals_1.expect)(response.status).toBe(400);
        (0, globals_1.expect)(response.body).toHaveProperty("error");
        (0, globals_1.expect)(response.body).toHaveProperty("details");
        (0, globals_1.expect)(response.body.details).toHaveProperty("email");
        (0, globals_1.expect)(response.body.details.email).toEqual(globals_1.expect.arrayContaining(["Invalid email format"]));
    }));
    (0, globals_1.it)("should check if user body role does not match admin or user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/api/user/register").send({
            email: "ibuemmanuel60@gmail.com",
            password: "Freakaziod1#",
            fullName: "IbuEmmanuel",
            role: "adminssd",
            mode: "signUp"
        });
        (0, globals_1.expect)(response.status).toBe(400);
        (0, globals_1.expect)(response.body).toHaveProperty("error");
        (0, globals_1.expect)(response.body).toHaveProperty("details");
        (0, globals_1.expect)(response.body.details).toHaveProperty("role");
        (0, globals_1.expect)(response.body.details.role).toEqual(globals_1.expect.arrayContaining(["Role must be either 'admin' or 'user'."]));
    }));
    (0, globals_1.it)("should check if it a valid password to use", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/api/user/register").send({
            email: "ibuemmanuel60@gmail.com",
            password: "Freakaziod",
            fullName: "IbuEmmanuel",
            role: "admin",
            mode: "signUp"
        });
        (0, globals_1.expect)(response.status).toBe(400);
        (0, globals_1.expect)(response.body).toHaveProperty("error");
        (0, globals_1.expect)(response.body).toHaveProperty("details");
        (0, globals_1.expect)(response.body.details).toHaveProperty("password");
        (0, globals_1.expect)(response.body.details.password).toEqual(globals_1.expect.arrayContaining([
            "Password must contain at least one number.",
            "Password must contain at least one special character."
        ]));
    }));
});
