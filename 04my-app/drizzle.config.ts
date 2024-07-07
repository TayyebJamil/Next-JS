import 'dotenv/config'
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "db-migrations",
  dbCredentials: {
    url: process.env.NEON_DB_URL!,
  }
  
});