import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",   // スキーマファイルのパス
  out:    "./drizzle",             // マイグレーションファイルの出力先
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
