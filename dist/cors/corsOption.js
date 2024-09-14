"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCorsOptions = getCorsOptions;
const allowedOrigins_1 = require("./allowedOrigins");
function getCorsOptions() {
    return {
        origin: (origin, callback) => {
            if (allowedOrigins_1.allowedOrigins.indexOf(origin || "") !== -1 || !origin) {
                callback(null, true);
            }
            else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        optionsSuccessStatus: 200
    };
}
