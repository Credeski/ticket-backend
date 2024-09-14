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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
const connect_1 = require("../../db/connect");
const user_1 = require("../../db/schema/user");
const encryptPassword_1 = require("../../utils/encryptPassword");
function registerUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, fullName, role } = request.body;
        const encryptPass = yield (0, encryptPassword_1.encryptPassword)(password);
        yield connect_1.db
            .insert(user_1.userSchema)
            .values({ email, fullName, password: encryptPass, role });
        response.status(201).json({ message: "User registered successfully!" });
    });
}
