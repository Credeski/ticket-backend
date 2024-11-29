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
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.post("/api/user/login", (0, catchAsyncErrors_1.default)(userController_1.loginUser));
(0, globals_1.describe)("POST /api/user/login", () => {
    (0, globals_1.it)("should login successfully with correct credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/api/user/login").send({
            email: "ibuemmanuel60@gmail.com",
            password: "Freakaziod1#"
        });
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toHaveProperty("user");
        (0, globals_1.expect)(response.body).toHaveProperty("accessToken");
    }));
    (0, globals_1.it)("should fail with incorrect credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/api/user/login").send({
            email: "ibuemmanuel60@gmail.com",
            password: "Freakaziod"
        });
        (0, globals_1.expect)(response.status).toBe(400);
        (0, globals_1.expect)(response.body).toHaveProperty("message");
        (0, globals_1.expect)(response.body.message).toContain("Invalid Email/Password");
    }));
    (0, globals_1.it)("should fail when email or password is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/api/user/login").send({});
        (0, globals_1.expect)(response.status).toBe(400);
        (0, globals_1.expect)(response.body).toHaveProperty("message");
        (0, globals_1.expect)(response.body.message).toContain("Email and Password are required!");
    }));
});
