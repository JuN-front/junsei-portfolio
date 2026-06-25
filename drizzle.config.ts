import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// drizzle-kit は Next.js の環境変数を自動で読まないため明示的に読み込む
dotenv.config({ path: ".env.local" });

export default {
  schema:  "./src/db/schema.ts",
  out:     "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
