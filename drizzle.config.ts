import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default defineConfig({
    schema: "./src/db/schema/",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!
    },
    out: "./drizzle",
    verbose: true,
    strict: true
});
